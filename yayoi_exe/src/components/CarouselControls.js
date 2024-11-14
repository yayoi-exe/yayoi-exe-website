import React from 'react';
import '../assets/styles/carouselControls.css';

const CarouselControls = ({ prevSlide, nextSlide }) => {
    return (
        <div className="carousel-controls">
            <button onClick={prevSlide}>Prev</button>
            <button onClick={nextSlide}>Next</button>
        </div>
    );
};

export default CarouselControls;
