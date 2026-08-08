import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import SocialLinks from '../components/SocialLinks';
import { ChevronRightIcon } from '../components/icons';

const TAGLINE_PHRASES = ['Software Engineer', "Engineering What's Next."];

const Main = () => {
    return (
        <div className="relative flex w-full grow">
            <div className="relative grid min-w-0 flex-1 grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]">
                <div className="col-start-2 row-start-2 grid justify-items-start gap-12">
                    <h1 className="text-[7rem] leading-[1.1] font-bold text-sub1">
                        Taichi
                        <br />
                        Shirakawa
                    </h1>
                    <div className="grid justify-items-start gap-4">
                        <AnimatedTitle phrases={TAGLINE_PHRASES} />
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-4 rounded-full bg-accent px-12 py-3 text-[2rem] font-bold text-sub1 no-underline transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            View Projects
                            <ChevronRightIcon />
                        </Link>
                    </div>
                </div>
                <SocialLinks className="col-start-2 row-start-3 self-end" />
            </div>
            <div className="relative min-w-0 flex-1">
                <img
                    src="/images/main_portfolio.png"
                    alt="Taichi Shirakawa"
                    draggable={false}
                    className="pointer-events-none absolute bottom-[calc(var(--spacing-page-y)*-1)] left-1/2 h-[min(95dvh,56rem)] w-auto max-w-[min(100%,42rem)] -translate-x-1/2 object-contain object-bottom select-none [-webkit-user-drag:none]"
                />
            </div>
        </div>
    );
};

export default Main;
