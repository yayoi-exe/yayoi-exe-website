import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import CodeContent from '../components/CodeContent';
import PhotoFrame from '../components/PhotoFrame';
import '../assets/styles/main.css';

const Main = () => {
    return (
        <div className='main-container'>
            <div className="left-container">
                {/* <CodeContent /> */}
                <AnimatedTitle />
            </div>
            <div className="right-container">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Main;
