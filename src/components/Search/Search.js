import React, {useEffect} from 'react';
import './Search.css';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Search() {

    useEffect(()=>{
        let buyRentText = document.getElementsByClassName('search-buyrent-text');
        for (let i=0; i< buyRentText.length; i++){
            buyRentText[i].addEventListener('click', (e)=>{
                let current = document.getElementsByClassName('active-search');
                current[0].className = current[0].className.replace(' active-search', '');
                buyRentText[i].className += ' active-search';
            })
        }
    }, [])

    return (
        <div className="search-container">
            <center>
                <img src="http://classiestate.com.au/static/media/classiestatelogo.23604396.png" className="search-logo-img" width="150px" height="80px" alt="classiEstateLogo.png"/>
            </center>
            <div className="search-group-text">
                <h1 className="search-title">Search</h1>
                <div className="search-buyrent">
                    <button className="btn search-buyrent-text buy active-search">Buy</button>
                    <button className="btn search-buyrent-text rent">Rent</button>
                </div>
            </div>
            <section className="search-sec">
                <div className="container">
                    <form action="#" method="post" noValidate="novalidate">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-9 col-md-9 col-sm-12 p-0">
                                        <input type="text" className="form-control search-slt" placeholder="Enter Location" />
                                    </div>
                                    
                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <button type="button" className="btn btn-success wrn-btn">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Search
