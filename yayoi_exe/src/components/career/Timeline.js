import React from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageTransition } from '../../context/PageTransitionContext';

const EASE = [0.32, 0.72, 0, 1];

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: EASE },
    },
};

const reducedItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
};

// isPageReady は TransitionPage インスタンス局所。退場中の旧ページは ready=true のままなので
// グローバル latch なしで「退場時に消えない／再入場で毎回再生」が両立する。
const Timeline = ({ items }) => {
    const { isPageReady } = usePageTransition();
    const prefersReducedMotion = useReducedMotion();

    const itemVariant = prefersReducedMotion ? reducedItemVariants : itemVariants;
    const listVariant = prefersReducedMotion ? { hidden: {}, visible: {} } : listVariants;

    return (
        <motion.ol
            className="relative flex list-none flex-col gap-[clamp(3.5rem,9vh,6rem)] py-[clamp(1rem,4vh,3rem)] pl-2.5"
            variants={listVariant}
            initial="hidden"
            animate={isPageReady ? 'visible' : 'hidden'}
        >
            <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute top-[calc(14px+clamp(1rem,4vh,3rem))] bottom-[calc(14px+clamp(1rem,4vh,3rem))] left-[19px] z-0 w-0.5 origin-bottom bg-sub2/50"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isPageReady ? 1 : 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }}
            />
            {items.map((item) => (
                <motion.li
                    key={item.id}
                    className="relative z-[1] flex items-start gap-8"
                    variants={itemVariant}
                >
                    <span
                        className={`mt-1 h-5 w-5 shrink-0 rounded-full ${
                            item.isCurrent ? 'bg-accent' : 'bg-sub2'
                        }`}
                        aria-hidden="true"
                    />
                    <div className="flex-1">
                        <span className="mb-2 block font-sans text-base font-bold text-sub2">
                            {item.year}
                        </span>
                        <h2 className="mb-2 font-sans text-xl font-bold text-sub1">{item.title}</h2>
                        <p className="font-sans text-base leading-relaxed font-normal text-sub2">
                            {item.description}
                        </p>
                    </div>
                </motion.li>
            ))}
        </motion.ol>
    );
};

Timeline.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            year: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            isCurrent: PropTypes.bool,
        })
    ).isRequired,
};

export default Timeline;
