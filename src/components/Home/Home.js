import React from 'react'
import Caraousel from '../Caraousel/Caraousel';
import useDocTitle from '../CustomHooks/useDocTitle';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';

function Home() {
    useDocTitle("HomePage")
    return (
        <div>
            <Navigation />
            <Search />
            <Caraousel />
            <h1>This is LandingPage</h1>
        </div>
    )
}

export default Home
