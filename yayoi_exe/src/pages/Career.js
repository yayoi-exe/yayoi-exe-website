import React from 'react';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import Timeline from '../components/career/Timeline';

const Career = () => {
    const timelineItems = educationData.map((data) => {
        const year = data.end ? `${data.start}\n -- \n${data.end}` : `${data.start}\n --- \n現在`;
        const title = data.type === 'education' ? data.university : data.company;
        const description = data.type === 'education' ? data.degree : data.title;
        return { id: data.id, year, title, description };
    });

    return (
        <div className="home-container">
            <main className="home-main">
                <section id="timeline" className="home-section">
                    <h2 className="home-subtitle">経歴</h2>
                    <Timeline items={timelineItems} />
                </section>
            </main>
        </div>
    );
};

export default Career;
