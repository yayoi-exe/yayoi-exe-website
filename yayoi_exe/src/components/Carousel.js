import React, { useState } from 'react';
import Slide from './Slide';
import CarouselControls from './CarouselControls';
import '../assets/styles/carousel.css';

const Carousel = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div>
            <Slide content={slides[currentIndex]} />
            <CarouselControls nextSlide={nextSlide} prevSlide={prevSlide} />
        </div>
    );
};

export default Carousel;
