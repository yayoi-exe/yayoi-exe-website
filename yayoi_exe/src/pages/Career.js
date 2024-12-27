import React from 'react';
import CareerCard from '../components/CareerCard';
import careerData from '../data/careerData.js';
import '../assets/styles/career.css';

const Career = () => {
    return (
        <div className="career-container">
            <h1 className="page-title">Career Highlights</h1>
            <div className="career-grid">
                {careerData.map((item) => (
                    <CareerCard key={item.id} career={item} />
                ))}
            </div>
        </div>
    );
};

export default Career;