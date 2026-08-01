import React from 'react';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';
import PhotoFrame from '../components/PhotoFrame';
import { buildTimelineItems } from '../components/career/timelineData';

const Career = () => {
    const timelineItems = buildTimelineItems(educationData);

    return (
        <div className="flex w-full grow">
            <div className="grid flex-1 place-content-center justify-items-start">
                <Timeline items={timelineItems} />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Career;
