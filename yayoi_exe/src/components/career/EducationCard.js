import React from 'react';
import PropTypes from 'prop-types';
import './EducationCard.css';

const EducationCard = ({
    university,
    degree,
    year,
    research,
    skills,
    image,
    details,
    achievements,
}) => {
    return (
        <div className="education-card">
            <img src={image} alt={university} className="education-card-image" />
            <div className="education-card-content">
                <h3 className="education-card-title">{university}</h3>
                <p className="education-card-degree">
                    {degree} - {year}
                </p>
                <p className="education-card-research">{research}</p>
                <div className="education-card-skills">
                    {skills.map((skill, index) => (
                        <span key={index} className="education-card-skill">
                            {skill}
                        </span>
                    ))}
                </div>
                <p className="education-card-details">{details}</p>

                {achievements?.length > 0 && (
                    <div className="project-achievements">
                        <h5 className="achievements-title">成果</h5>
                        <ul className="achievements-list">
                            {achievements.map((achievement, idx) => (
                                <li key={idx}>
                                    <a
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="achievement-link"
                                    >
                                        {achievement.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

EducationCard.propTypes = {
    university: PropTypes.string,
    degree: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    research: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    details: PropTypes.string,
    achievements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string,
        })
    ),
};

EducationCard.defaultProps = {
    skills: [],
    achievements: [],
};

export default EducationCard;
