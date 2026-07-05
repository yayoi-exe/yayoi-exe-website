import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Timeline.css';

const Timeline = ({ items }) => {
    return (
        <div className="timeline-container">
            {items.map((item, index) => (
                <motion.div
                    key={item.id ?? index}
                    className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="timeline-year">
                        <h1 className="timeline-year-text">{item.year}</h1>
                    </div>
                    <div className="timeline-content">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

Timeline.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            year: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
        })
    ).isRequired,
};

export default Timeline;
