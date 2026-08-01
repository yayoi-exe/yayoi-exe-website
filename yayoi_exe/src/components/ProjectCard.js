import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNewIcon } from './icons';

function useProjectCard(project) {
    return {
        name: project.name,
        description: project.description,
        thumbnail: project.thumbnail,
        techStack: (project.techStack ?? []).filter(Boolean),
        webLink: project.webLink || null,
    };
}

const ProjectCard = ({ project }) => {
    const { name, description, thumbnail, techStack, webLink } = useProjectCard(project);

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-sub2 bg-main p-6">
            <img src={thumbnail} alt={name} className="h-40 w-full rounded-lg object-cover" />

            <h2 className="font-sans text-lg font-bold text-sub1">{name}</h2>

            <p className="font-sans text-sm leading-normal font-normal text-sub2">{description}</p>

            <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-accent-soft px-2.5 py-1 font-sans text-xs font-bold text-sub1"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {webLink && (
                <div className="mt-auto">
                    <a
                        href={webLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-[0.35rem] font-sans font-bold text-sub1 no-underline"
                    >
                        View Link
                        <OpenInNewIcon />
                    </a>
                </div>
            )}
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        techStack: PropTypes.arrayOf(PropTypes.string),
        webLink: PropTypes.string,
    }).isRequired,
};

export default ProjectCard;
