import React from 'react';
import Carousel from '../components/Carousel';
import '../assets/styles/carouselMain.css';

const CarouselMain = () => {
    const slides = [
        { image: 'https://abovepromotions.com/wp-content/uploads/400x300-ph.jpg', caption: 'Slide 1' },
        { image: 'https://abovepromotions.com/wp-content/uploads/400x300-ph.jpg', caption: 'Slide 2' },
        { image: 'https://abovepromotions.com/wp-content/uploads/400x300-ph.jpg', caption: 'Slide 3' },
    ];

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Carousel slides={slides} />
        </div>
    );
};

export default CarouselMain;
