import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projectsData.js';
import '../assets/styles/projects.css';

const Projects = () => {
    return (
        <div className="projects-container">
            <h1 className="page-title">Projects</h1>
            <div className="projects-grid">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
