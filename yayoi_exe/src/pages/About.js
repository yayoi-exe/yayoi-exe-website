import React from 'react';

import IntroCodeFrame from '../components/IntroCodeFrame';
import PhotoFrame from '../components/ImageFrame';
import '../assets/styles/main.css';

const About = ({ content }) => {
    return (
        <div className='main-container'>
            <div className="left-container">
                <PhotoFrame />
            </div>
            <div className="right-container">
                <IntroCodeFrame />
            </div>
        </div>
    );
};

export default About;
