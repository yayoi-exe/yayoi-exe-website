import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import '../assets/styles/projects.css';

const Projects = () => {
    return (
        <div className="projects-container">
            <div className="page-title">Projects</div>
            <div className="projects-grid">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
