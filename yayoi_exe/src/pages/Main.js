import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import SocialLinks from '../components/SocialLinks';
import { ArrowForwardIcon } from '../components/icons';

const TAGLINE_PHRASES = ['Software Engineer', "Engineering What's Next."];

const Main = () => {
    return (
        <div className="flex w-full grow">
            <div className="grid flex-1 place-content-center justify-items-start gap-6">
                <h1 className="text-3xl leading-[1.1] font-bold text-sub1">Taichi Shirakawa</h1>
                <AnimatedTitle phrases={TAGLINE_PHRASES} />
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-sub1 no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                    View Projects
                    <ArrowForwardIcon />
                </Link>
                <SocialLinks />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <PhotoFrame />
            </div>
        </div>
    );
};

export default Main;
