import React from 'react';
import PropTypes from 'prop-types';
import useTypewriterEffect from '../hooks/useTypewriterEffect';

const AnimatedTitle = ({ phrases }) => {
    const contentRef = useTypewriterEffect(phrases);

    return (
        <p
            className="inline-block h-[1.4em] overflow-hidden align-top font-sans text-[3rem] leading-[1.4] font-normal whitespace-pre text-sub2"
            style={{ boxSizing: 'content-box' }}
            ref={contentRef}
        ></p>
    );
};

AnimatedTitle.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnimatedTitle;
