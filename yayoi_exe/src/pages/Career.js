import React from 'react';
import '../assets/styles/career.css';
import educationData from '../data/education.json';
import EducationCard from '../components/career/EducationCard';
import Timeline from '../components/career/Timeline';

const NewCareer = () => {
    const timelineItems = educationData.map((data) => {
        const year = data.end ? `${data.start}\n -- \n${data.end}` : `${data.start}\n --- \n現在`;
        const title = data.type === 'education' ? data.university : data.company;
        const description = data.type === 'education' ? data.degree : data.title;
        return { year, title, description };
    });

    return (
        <div className="home-container">
            <main className="home-main">
                <section id="timeline" className="home-section">
                    <h2 className="home-subtitle">経歴</h2>
                    <Timeline items={timelineItems} />
                </section>

                <section id="education" className="home-section">
                    <h2 className="home-subtitle">学歴</h2>
                    {educationData
                        .filter((data) => data.type === 'education')
                        .map((edu, index) => (
                            <EducationCard key={index} {...edu} />
                        ))}
                </section>
            </main>
        </div>
    );
};

export default NewCareer;
