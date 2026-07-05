import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/main.css';

const TwoColumnLayout = ({ children }) => {
    return (
        <div className="main-container">
            {React.Children.map(children, (child) => (
                <div className="containers">{child}</div>
            ))}
        </div>
    );
};

TwoColumnLayout.propTypes = {
    children: PropTypes.node,
};

export default TwoColumnLayout;
