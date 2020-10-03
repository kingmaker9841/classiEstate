import React,{useEffect} from 'react';
import {Link} from 'react-router-dom'
import './Navigation.css';
import '../Caraousel/Caraousel';

function Navigation() {

    const scrollHandler = (e)=>{
        let navContainer = document.getElementsByClassName('nav-container')[0];
        if (window.pageYOffset > 10) {
            navContainer.classList.add('navBackground')
        }else {
            navContainer.classList.remove('navBackground');
        }
    }

    const hamburgerClick= (e) =>{
        let line1 = document.querySelector('.line1');
        let line2 = document.querySelector('.line2');
        let line3 = document.querySelector('.line3');
        let hamburgerSlide = document.querySelector('.hamburger-slide');

        hamburgerSlide.classList.toggle('hamburger-slide-open');
        document.body.classList.toggle('body-overflow');
        line1.classList.toggle('line1-open');
        line2.classList.toggle('line2-open');
        line3.classList.toggle('line3-open');
    }

    useEffect(()=>{
        let navLinks = document.getElementsByClassName('link');
        let navLines = document.querySelector('.nav-lines');
        let hamLink = document.querySelectorAll('.ham-link');

        //Navigation backgroundColor Toggle (White <> Transparent)
        window.addEventListener('scroll', scrollHandler);

        //HamLink Active
        for (let i = 0; i<hamLink.length; i++) {
            hamLink[i].addEventListener('click', (e)=>{
                let current = document.querySelector('.active-ham');
                current.className = current.className.replace(' active-ham', '');
                hamLink[i].className += ' active-ham';
            })
        }

        //Active Nav Links
        for (let i =0; i< navLinks.length; i++){
            navLinks[i].addEventListener('click', (e)=>{
                let current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                navLinks[i].className += ' active';
            })
        }

        //SideBar
        navLines.addEventListener('click', hamburgerClick);

        //Unmounting 
        return ()=>{
            window.removeEventListener('scroll', scrollHandler);
            navLines.removeEventListener('click', hamburgerClick);
        }
    }, [])
    return (
        <div className="nav-container">
            <div className="nav-logo">
                <Link to="/" className="link">
                    <img src="http://classiestate.com.au/static/media/classiestatelogo.23604396.png" className="ml-5" width="200px" height="100px" alt="classiEstateLogo.png"/>
                </Link>
            </div>
            <div className="nav-links">
                <div className="nav-link nav-home">
                    <Link to="/" className="link link-nav active">
                        <span className="">Home</span>
                    </Link>
                </div>
                <div className="nav-link nav-listing">
                    <Link to="" className="link link-nav">
                        <span className="">Listing</span>
                    </Link>
                </div>
                <div className="nav-link nav-agents">
                    <Link to="" className="link link-nav">
                        <span className="">Find Agents</span>
                    </Link>
                </div>
            </div>
            <div className="nav-authenticate">
                <div className="nav-link nav-signin">
                    <Link to="/login" className="link link-nav">
                        <span className="">Sign In</span>
                    </Link>
                </div>
                <div className="nav-signup">
                    <Link to="/register" className="link">
                        <button className="signup btn btn-success">Sign Up</button>
                    </Link>
                </div>
            </div>
            <div className="nav-hamburger">
                <div className="nav-lines">
                    <span className="nav-line line1"></span>
                    <span className="nav-line line2"></span>
                    <span className="nav-line line3"></span>
                </div>
            </div>
            <div className="hamburger-slide">
                <div className="ham-authenticate">
                    <div className="ham-signin">
                        <Link to="/login" className="link link-ham">
                            <span className="ham-signin-link">Sign In</span>
                        </Link>
                    </div>
                    <div className="ham-signup">
                        <Link to="/register" className="link">
                            <button className="signup btn btn-success">Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="ham-links">
                    <div className="ham-link ham-home active-ham">
                        <Link to="/" className="ham link-ham">
                            <span className="">Home</span>
                        </Link>
                    </div>
                    <div className="ham-link ham-listing">
                        <Link to="" className="ham link-ham">
                            <span className="">Listing</span>
                        </Link>
                    </div>
                    <div className="ham-link ham-agents">
                        <Link to="" className="ham link-ham">
                            <span className="">Find Agents</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
