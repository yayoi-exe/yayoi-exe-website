import React from 'react';
import PropTypes from 'prop-types';
import OpenInNewIcon from './icons/OpenInNewIcon';
import '../assets/styles/projectCard.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            {/* サムネイル画像 */}
            <img src={project.thumbnail} alt={project.name} className="project-thumbnail" />

            {/* プロジェクト名 */}
            <h2 className="project-name">{project.name}</h2>

            {/* プロジェクト説明 */}
            <p className="project-description">{project.description}</p>

            {/* 使用技術スタック */}
            <div className="project-tech-stack">
                {project.techStack.map(
                    (tech, index) =>
                        tech && ( // 空文字を表示しない
                            <span key={index} className="tech-badge">
                                {tech}
                            </span>
                        )
                )}
            </div>

            {/* プロジェクトリンク */}
            {project.webLink && ( // webLink が空なら表示しない
                <div className="project-links">
                    <a
                        href={project.webLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
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
