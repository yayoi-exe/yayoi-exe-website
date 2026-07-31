import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <div className="flex w-full grow items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
