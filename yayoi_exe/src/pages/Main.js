import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import ImageFrame from '../components/ImageFrame';
import '../assets/styles/main.css';

const Main = () => {
    return (
        <div className='main-container'>
            <div className="containers">
                <AnimatedTitle />
            </div>
            <div className="containers">
                <ImageFrame />
            </div>
        </div>
    );
};

export default Main;
