import React from 'react';
import '../assets/styles/layout.css';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';
import PhotoFrame from '../components/PhotoFrame';
import { buildTimelineItems } from '../components/career/timelineData';

const Career = () => {
    const timelineItems = buildTimelineItems(educationData);

    return (
        <div className="page-split career-container">
            <section className="career-timeline">
                <Timeline items={timelineItems} />
            </section>
            <div className="page-split-media">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Career;
