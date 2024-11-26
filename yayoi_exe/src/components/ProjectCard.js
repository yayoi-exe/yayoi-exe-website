import React from 'react';
import '../assets/styles/projectCard.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            {/* サムネイル画像 */}
            <img
                src={project.thumbnail}
                alt={project.name}
                className="project-thumbnail"
            />

            {/* プロジェクト名 */}
            <h2 className="project-name">{project.name}</h2>

            {/* プロジェクト説明 */}
            <p className="project-description">{project.description}</p>

            {/* 使用技術スタック */}
            <div className="project-tech-stack">
                {project.techStack.map((tech, index) => (
                    tech && ( // 空文字を表示しない
                        <span key={index} className="tech-badge">{tech}</span>
                    )
                ))}
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
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
