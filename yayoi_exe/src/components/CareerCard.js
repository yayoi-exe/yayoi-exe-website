import React from "react";
import "../assets/styles/careerCard.css";

const CareerCard = ({ career }) => {
    return (
        <div className="career-card">
            {/* 学校名 */}
            <h2 className="career-institution">{career.institution}</h2>
            {/* 学科 */}
            {career.department && (
                <h3 className="career-department">{career.department}</h3>
            )}
            {/* 在籍期間 */}
            <p className="career-duration">
                {career.startYear}年 ～ {career.endYear ? career.endYear + "年" : "現在"}

            </p>

            {/* プロジェクト */}
            <div className="career-projects">
                {career.projects.map((project, index) => (
                    <div key={index} className="project">
                        {/* プロジェクトタイトル */}
                        <h4 className="project-title">{project.title}</h4>

                        {/* プロジェクト説明 */}
                        {project.description && (
                            <p className="project-description">
                                {project.description}
                            </p>
                        )}

                        {/* 使用技術 */}
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="project-tech-stack">
                                <h5>使用技術</h5>
                                <div className="tech-badges">
                                    {project.techStack.map((tech, idx) => (
                                        <span key={idx} className="tech-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 成果 */}
                        {project.achievements &&
                            project.achievements.length > 0 && (
                                <div className="project-achievements">
                                    <h5>成果</h5>
                                    <ul>
                                        {project.achievements.map(
                                            (achievement, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={
                                                            achievement.link
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {achievement.name}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareerCard;