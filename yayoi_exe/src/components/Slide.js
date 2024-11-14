import React from 'react';
import '../assets/styles/slide.css';

const Slide = ({ content }) => {
    return (
        <div className="slide">
            <img src={content.image} alt={content.caption} />
            <p>{content.caption}</p>
        </div>
    );
};

export default Slide;
