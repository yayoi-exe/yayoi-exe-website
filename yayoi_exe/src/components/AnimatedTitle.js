import React from 'react';
import PropTypes from 'prop-types';
import useTypewriterEffect from '../hooks/useTypewriterEffect';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = ({ phrases }) => {
    const contentRef = useTypewriterEffect(phrases);

    return <p className="home-tagline" ref={contentRef}></p>;
};

AnimatedTitle.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnimatedTitle;
