import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Timeline.css';

const Timeline = ({ items }) => {
    return (
        <ol className="timeline-list">
            {items.map((item, index) => (
                <motion.li
                    key={item.id}
                    className="timeline-row"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                    <span
                        className={`timeline-dot ${item.isCurrent ? 'is-current' : ''}`}
                        aria-hidden="true"
                    />
                    <div className="timeline-body">
                        <span className="timeline-year">{item.year}</span>
                        <h2 className="timeline-title">{item.title}</h2>
                        <p className="timeline-description">{item.description}</p>
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
