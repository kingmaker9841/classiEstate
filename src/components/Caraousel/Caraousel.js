import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import hero1 from './hero1.jpg';
import hero2 from './hero2.jpg';
import hero3 from './hero3.jpg';
import './Caraousel.css';

function Caraousel() {
    return (
        <div>
            <AliceCarousel 
                autoPlayInterval={2000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={false}
                playButtonEnabled={false}
                disableAutoPlayOnAction={true} 
                dotsDisabled={true}
                buttonsDisabled={true}
            >
                <img src={hero1} className="slider" alt="classiHomeImg.jpg" />
                <img src={hero2} className="slider"alt="heroimage2.jpg"/>
                <img src={hero3} className="slider" alt="heroimage3.jpg"/>
            </AliceCarousel>
        </div>
    )
}

export default Caraousel
