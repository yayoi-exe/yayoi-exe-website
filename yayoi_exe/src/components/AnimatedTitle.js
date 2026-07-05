import React from 'react';
import useTypewriterEffect from '../hooks/useTypewriterEffect';
import '../assets/styles/animatedTitle.css';

const TITLES = ['Taichi Shirakawa', 'IT Engineer !!!', 'UX/UI Designer !'];

const AnimatedTitle = () => {
    const contentRef = useTypewriterEffect(TITLES);

    return (
        <div className="container">
            <h1 id="animated-title">
                <span className="prefix">I'm&nbsp;</span>
                <span ref={contentRef}></span>
            </h1>
        </div>
    );
};

export default AnimatedTitle;
