import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Timeline = ({ items }) => {
    return (
        <ol className="timeline-list relative flex list-none flex-col gap-[clamp(3.5rem,9vh,6rem)] py-[clamp(1rem,4vh,3rem)] pl-2.5">
            {items.map((item, index) => (
                <motion.li
                    key={item.id}
                    className="relative z-[1] flex items-start gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
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
        </ol>
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
