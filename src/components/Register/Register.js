import React,{useReducer, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import useDocTitle from '../CustomHooks/useDocTitle';
import './Register.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const initialState = {
    firstName : '',
    lastName : '',
    email: '',
    password: '',
    error: '',
    loading: false
}
const reducer = (state, action)=>{
    switch(action.type){
        case 'firstNameChange': return {...state, firstName: action.payload} 
        case 'lastNameChange': return {...state, lastName: action.payload}
        case 'emailChange': return {...state, email: action.payload}
        case 'passwordChange': return {...state, password: action.payload}
        case 'nameError' : return {...state, error: action.payload}
        case 'noError' : return {...state, error: action.payload}
        case 'loadingTrue' : return {...state, loading: true}
        case 'loadingFalse' : return {...state, loading: false}
        case 'emailAlreadyRegisteredError' : return {...state, error: action.payload}
        case 'invalidEmailError': return {...state, error: action.payload}
        case 'passwordError' : return {...state, error: action.payload}
        default:  return {...state}
    }
}

function Register() {
    //Document Title
    useDocTitle("Registration");

    //Check for numbers inside first and last names
    let nameRegex = /[a-zA-Z]+$/

    //Reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    let [success, setSuccess] = useState(false);
    let [isMounted, setIsMounted] = useState(false);

    // Handling Submit
    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        //Loading Starts
        dispatch({type: 'loadingTrue'});

        const {firstName, lastName, email, password} = state;

        //Validate first and last name
        if (!((nameRegex.test(state.firstName)) && nameRegex.test(state.lastName))){
            dispatch({type: 'nameError', payload: 'Names cannot contain numbers. Please use character from A-Z and try again...'});
            setTimeout(()=> dispatch({type: 'nameError', payload: ''}), 5000);
            window.scrollTo(0,0);
            return dispatch({type: 'loadingFalse'});
        }

        //Post 
        axios.post("/api/v2/signup",{
            first_name: firstName, last_name: lastName, email, password
        })
        .then((response)=>{
            console.log(response.data)
            setSuccess(true);
        })
        .catch((error)=>{
            window.scrollTo(0,0);
            let e = error.response.data;

            e.message === 'Email already exists.' &&
            dispatch({type: 'emailAlreadyRegisteredError', payload: 'Email is already registered. Try again with a new email address...'})
            
            e.message === 'Validation Failed' &&
            dispatch({type: 'invalidEmailError', payload: "The email field must contain a valid email address."})

            e.message === 'The password field must be at least 8 characters in length.' &&
            dispatch({type: 'passwordError', payload: 'The password field must be at least 8 characters in length.'})

            setTimeout(()=> dispatch({type: 'noError', payload: ''}), 5000);

        })
        .then(()=>{
            dispatch({type: 'loadingFalse'});
            return setIsMounted(true);
        })
        
    }
    return (
        <div className="container-register">

            {/* ******************Left Container Start****************** */}
            <div className="left-container">
                <Link to="/">
                    <img src="http://classiestate.com.au/static/media/classiestatelogo.23604396.png" className="ml-5" width="200px" height="100px" alt="classiEstateLogo.png"/>
                </Link>
                <div className="register-text ml-5 mt-5 mb-5">
                    <h3> Register with <strong>ClassiEstate</strong></h3>
                </div>

                {/* Handle Error */}
                {
                    state.error && <p className="alert alert-danger ml-5 mb-3" role="alert"> {state.error} </p>
                }

                {/* Input Credentials Start--------------- */}
                <form className="register-form" onSubmit={(e)=> onSubmitHandler(e)}>
                    <p className="muted">All the fields marked with <span className="text-danger">*</span> are mandatory</p>
                    
                    <div className="form-group col-md-8">
                        <label htmlFor="firstName" ><strong>First Name<span className="text-danger">*</span></strong></label>
                        <input type="text" onChange={(e)=> dispatch({type: 'firstNameChange', payload: e.target.value})} className="form-control form-control-lg" id="firstName" maxLength="20" required/>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="lastName" ><strong>Last Name</strong></label>
                        <input type="text" onChange={(e)=> dispatch({type: 'lastNameChange', payload: e.target.value})} className="form-control form-control-lg" id="lastName" maxLength="20"/>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="email" ><strong>Email<span className="text-danger">*</span></strong></label>
                        <input type="email" onChange={(e)=> dispatch({type: 'emailChange', payload: e.target.value})} className="form-control form-control-lg" id="email" required/>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="newPassword" ><strong>New Password<span className="text-danger">*</span></strong></label>
                        <input type="password" onChange={(e)=> dispatch({type: 'passwordChange', payload: e.target.value})} className="form-control form-control-lg" id="newPassword" maxLength="50" aria-describedby="passwordHelp" required/>
                        <small id="passwordHelp" className="text-muted">Must be at least 8 characters long.</small>
                    </div>
                    {/* Input Credentials End--------------- */}

                    {/* CheckBoxes */}
                    <div className="form-group row col-md-12 ml-3 switch-btn">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label" htmlFor="rememberMe"><strong>Remember me</strong></label>
                        </div>

                        <div className="custom-control custom-switch switch-second">
                            <input type="checkbox" className="custom-control-input" id="agreement" required/>
                            <label className="custom-control-label" htmlFor="agreement"><strong>I agree</strong></label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-8 mt-5">
                        {
                            state.loading ? (
                                <button className="form-control btn btn-success btn-lg btn-submit"><ClipLoader loading={state.loading} color={"#f4f4f4"} /></button>
                            ) : (
                                <button type="submit" className="form-control btn btn-success btn-lg btn-submit">
                                    <FontAwesomeIcon icon="unlock-alt" size="sm" className="lock-register"/>
                                    &nbsp;Register
                                </button>
                            )
                        }
                    </div>

                    {/* Already Having an account on ClassiEstate */}
                    <div className="text-center mt-2 mb-5">
                        <span className="text-muted">Already have an account,
                            <Link to="/" className="link text-danger">&nbsp; Login </Link>
                        </span>
                    </div>


                    <div className="mt-5">
                        <strong>Or Connect with</strong>
                    </div>

                    {/* Social Media Button */}
                    <div className="social-btn mt-5">
                        <div className="google-btn btn btn-large" >
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

            {/* Successful Register */}
            {
                success && isMounted &&
                    <Redirect to={{
                        pathname: "/login",
                        state: {
                            fromRegister: true
                        }
                    }} />
            }

        </div>
    )
}

export default Register
