import React,{useReducer, useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom';
import useDocTitle from '../CustomHooks/useDocTitle';
import '../Register/Register.css';
import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
    success: false,
}
const reducer = (state, action)=>{
    switch(action.type){
        case 'emailChange': return {...state, email: action.payload}
        case 'passwordChange': return {...state, password: action.payload}
        case 'postError' : return {...state, error: action.payload}
        case 'loadingTrue' : return {...state, loading: true}
        case 'loadingFalse' : return {...state, loading: false}
        case 'success' : return {...state, success: true}
        default:  return {...state}
    }
}

function Login(props) {
    //Document Title
    useDocTitle("Login -ClassiEstate");

    //Reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    let [fromRegister, setFromRegister] = useState(false);
    let [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        //Registration Successful
        if(props.location && props.location.state && props.location.state.fromRegister){ 
            setFromRegister(true); 
        }   
        return ;
    }, [props.location])
    

    // Handling Submit
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
            //Loading Starts
        dispatch({type: 'loadingTrue'})

        const {email, password} = state;

        //Post data with credentials
        axios.post('/api/v2/authenticate', {
            email, password
        }, {withCredentials: true})

        .then(response=>{
            console.log(response.data);
            console.log(response);

            response.data.message === 'Validation Failed' && 
            dispatch({type: 'postError', payload: 'The password field is required.'});

            response.status === 200 &&
            dispatch({type: 'success'});
        })
        .catch((error)=>{
            window.scrollTo(0,0);
            let e = error.response.data;

            e.message === 'email or password do not match' &&
            dispatch({type: 'postError', payload: 'Email or Password do not match. Please check and Try Again'});
            
            e.message === 'Your account is not activated yet. Please enter the code sent in email to verify your email.' &&
            dispatch({type: 'postError', payload: 'Your account is not activated yet. Please enter the code sent in email to verify your email.'});

            dispatch({type: 'loadingFalse'});
        })
        .then(()=> {
            return setIsMounted(true);
        })

    }
    return (
        <div className="container-login">

            {/* ******************Left Container Start****************** */}
            <div className="left-container">
                <Link to="/">
                    <img src="http://classiestate.com.au/static/media/classiestatelogo.23604396.png" className="classiLogo" width="200px" height="100px" alt="classiEstateLogo.png"/>
                </Link>
                <div className="register-text ml-5 mt-5 mb-5">
                    <h3> Welcome Back</h3>
                    <p><strong className="text-muted">Please log into your account</strong></p>
                </div>


                {/* Handle Error */}
                {
                    state.error && 
                    <p className="alert alert-danger ml-5 mb-3" role="alert"> {state.error} </p>
                }
                {/* Redirection from Register */}
                {
                    fromRegister && 
                    <p className="alert alert-warning ml-5 mb-3" role="alert">Registration Successful. Please check your email and follow the instruction to activate your account.</p> 
                }


                {/* Input Credentials Start--------------- */}
                <form className="register-form" onSubmit={(e)=> onSubmitHandler(e)}>
                    <p className="muted">All the fields marked with <span className="text-danger">*</span> are required</p>

                    <div className="form-group col-md-8">
                        <label htmlFor="email" ><strong>Email<span className="text-danger">*</span></strong></label>
                        <input type="email" onChange={(e)=> dispatch({type: 'emailChange', payload: e.target.value})} className="form-control form-control-lg" id="email" required/>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="newPassword" ><strong>Password<span className="text-danger">*</span></strong></label>
                        <input type="password" onChange={(e)=> dispatch({type: 'passwordChange', payload: e.target.value})} className="form-control form-control-lg" id="newPassword" maxLength="50" required/>  
                    </div>
                    {/* Input Credentials End--------------- */}


                    {/* Submit Button */}
                    <div className="form-group col-md-8 mt-5">
                        {
                            state.loading ? (
                                <button className="form-control btn btn-success btn-lg btn-submit">
                                    <ClipLoader loading={state.loading} color={"#f4f4f4"} />
                                </button>
                            ) : (
                                <button type="submit" className="form-control btn btn-success btn-lg btn-submit">
                                    <FontAwesomeIcon icon="unlock-alt" className="lock-register"/>
                                    &nbsp;Login
                                </button>
                            )
                        }
                    </div>

                    <div className="mt-5">
                        <strong>Or Connect with</strong>
                    </div>

                    {/* Social Media Button */}
                    <div className="social-btn mt-5">
                        <div className="google-btn btn btn-large ">
                            <FontAwesomeIcon icon={["fab","google-plus-square"]} className="mr-2"/>
                            Google+
                        </div>

                        <div className="facebook-btn btn btn-large">
                            <FontAwesomeIcon icon={["fab", "facebook-square"]} className="mr-2" />
                            Facebook
                        </div>
                    </div>

                </form>
            </div>
            {/* ****************************Left Container End********************* */}

            {/* Right Container Image Div */}
            <div className="right-container">
                <img src="http://classiestate.com.au/static/media/login-page-bg.eea21cfc.jpg" className="img-classiBuilding" alt="classEstateBuilding.jpeg"/>
            </div>


            {/* Successful Login ? */}

            {
              isMounted && state.success && <Redirect to={{
                    pathname: "/",
                    state: {
                        fromLogin: true
                    }
                }} />
            }

        </div>
    )
}

export default Login
