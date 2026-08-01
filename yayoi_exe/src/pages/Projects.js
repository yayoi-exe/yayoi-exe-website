import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <div className="mx-auto grid w-full max-w-5xl grow grid-cols-2 content-center gap-8">
            {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default Projects;
