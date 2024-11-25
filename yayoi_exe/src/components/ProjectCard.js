// ProjectCard.js
import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <img src={project.thumbnail} alt={project.name} className="project-thumbnail" />
            <h2 className="project-name">{project.name}</h2>
            <p className="project-description">{project.description}</p>
            <div className="project-tech-stack">
                {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                ))}
            </div>
            <div className="project-links">
                <a href={project.webLink} target="_blank" rel="noopener noreferrer" className="button">
                    View Link
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
