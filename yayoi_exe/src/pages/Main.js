import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import { ArrowForwardIcon, EmailIcon, GithubIcon, LinkedinIcon } from '../components/icons';
import '../assets/styles/layout.css';
import '../assets/styles/main.css';

const TAGLINE_PHRASES = ['Software Engineer', "Engineering What's Next."];

const SOCIAL_LINKS = {
    github: 'https://github.com/yayoi-exe',
    linkedin: '#',
    email: 'email@email.com',
};

const Main = () => {
    return (
        <div className="page-split">
            <div className="home-hero-copy">
                <h1 className="home-name">Taichi Shirakawa</h1>
                <AnimatedTitle phrases={TAGLINE_PHRASES} />
                <Link to="/projects" className="hero-cta">
                    View Projects
                    <ArrowForwardIcon />
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
                    <a href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn">
                        <LinkedinIcon />
                    </a>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} aria-label="Email">
                        <EmailIcon />
                    </a>
                </div>
            </div>
            <div className="page-split-media">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Main;
