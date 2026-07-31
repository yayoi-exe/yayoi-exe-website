import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import { ArrowForwardIcon, EmailIcon, GithubIcon, LinkedinIcon } from '../components/icons';

const TAGLINE_PHRASES = ['Software Engineer', "Engineering What's Next."];

const SOCIAL_LINKS = {
    github: 'https://github.com/yayoi-exe',
    linkedin: '#',
    email: 'email@email.com',
};

const Main = () => {
    return (
        <div className="flex w-full grow">
            <div className="flex flex-1 flex-col items-start justify-center gap-6">
                <h1 className="text-3xl leading-[1.1] font-bold text-sub1">Taichi Shirakawa</h1>
                <AnimatedTitle phrases={TAGLINE_PHRASES} />
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-sub1 no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                    View Projects
                    <ArrowForwardIcon />
                </Link>
                <div className="flex items-center gap-4">
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="inline-flex text-sub1"
                    >
                        <GithubIcon />
                    </a>
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        aria-label="LinkedIn"
                        className="inline-flex text-sub1"
                    >
                        <LinkedinIcon />
                    </a>
                    <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        aria-label="Email"
                        className="inline-flex text-sub1"
                    >
                        <EmailIcon />
                    </a>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Main;
