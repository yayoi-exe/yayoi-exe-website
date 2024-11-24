import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import ImageFrame from '../components/ImageFrame';
import '../assets/styles/main.css';

const Main = () => {
    return (
        <div className='main-container'>
            <div className="left-container">
                <AnimatedTitle />
            </div>
            <div className="right-container">
                <ImageFrame />
            </div>
        </div>
    );
};

export default Main;
