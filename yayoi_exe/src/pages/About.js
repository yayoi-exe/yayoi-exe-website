import React from 'react';
import PhotoFrame from '../components/ImageFrame';
import IntroCodeFrame from '../components/IntroCodeFrame';
import '../assets/styles/main.css';

const About = () => {
    return (
        <div className='main-container'>
            <div className="containers">
                <PhotoFrame />
            </div>
            <div className="containers">
                <IntroCodeFrame />
            </div>
        </div>
    );
};

export default About;
