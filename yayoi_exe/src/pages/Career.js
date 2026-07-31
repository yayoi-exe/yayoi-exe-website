import React from 'react';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';
import PhotoFrame from '../components/PhotoFrame';
import { buildTimelineItems } from '../components/career/timelineData';

const Career = () => {
    const timelineItems = buildTimelineItems(educationData);

    return (
        <div className="flex w-full grow items-center gap-[clamp(2rem,6vw,5rem)]">
            <section className="max-w-[640px] flex-1 px-[clamp(0.5rem,2vw,1.5rem)]">
                <Timeline items={timelineItems} />
            </section>
            <div className="flex flex-1 items-center justify-center">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Career;
