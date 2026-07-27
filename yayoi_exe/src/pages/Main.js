import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import GithubIcon from '../components/icons/GithubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import '../assets/styles/main.css';

const TAGLINE_PHRASES = [
    "Software Engineer & Master's Student",
    "Let's build something amazing together!",
];

const SOCIAL_LINKS = {
    github: 'https://github.com/yayoi-exe',
    linkedin: '#',
    email: 'email@email.com',
};

const Main = () => {
    return (
        <div className="home-hero">
            <div className="home-hero-copy">
                <h1 className="home-name">Taichi Shirakawa</h1>
                <AnimatedTitle phrases={TAGLINE_PHRASES} />
                <Link to="/projects" className="hero-cta">
                    View Projects
                    <span className="material-symbols-outlined" aria-hidden="true">
                        arrow_forward
                    </span>
                </Link>
                <div className="home-socials">
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <GithubIcon />
                    </a>
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <LinkedinIcon />
                    </a>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="home-email">
                        {SOCIAL_LINKS.email}
                    </a>
                </div>
            </div>
            <div className="home-hero-photo">
                <span className="home-caption">Engineering What&apos;s Next.</span>
                <PhotoFrame />
                <svg className="home-decoration" viewBox="0 0 200 300" aria-hidden="true">
                    <polyline className="home-decoration-line" points="20,280 90,150 170,60" />
                    <circle className="home-decoration-dot" cx="20" cy="280" r="6" />
                    <circle className="home-decoration-dot" cx="90" cy="150" r="6" />
                    <circle className="home-decoration-dot" cx="170" cy="60" r="6" />
                </svg>
            </div>
        </div>
    );
};

export default Main;
