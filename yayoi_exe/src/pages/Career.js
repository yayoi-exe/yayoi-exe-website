import React from 'react';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';
import PhotoFrame from '../components/PhotoFrame';
import { buildTimelineItems } from '../components/career/timelineData';

const Career = () => {
    const timelineItems = buildTimelineItems(educationData);

    return (
        <div className="career-container">
            <section className="career-timeline">
                <h2 className="career-heading">経歴</h2>
                <Timeline items={timelineItems} />
            </section>
            <div className="career-photo">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Career;
