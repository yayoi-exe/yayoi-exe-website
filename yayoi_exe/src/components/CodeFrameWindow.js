import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/codeFrameWindow.css';

const CodeFrameWindow = ({ title, children, onClick }) => {
    const isInteractive = Boolean(onClick);

    const handleKeyDown = (event) => {
        if (!isInteractive) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event);
        }
    };

    return (
        <div
            className="vscode-window"
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        >
            <div className="vscode-header">
                <div className="vscode-buttons">
                    <span className="vscode-button red"></span>
                    <span className="vscode-button yellow"></span>
                    <span className="vscode-button green"></span>
                </div>
                <div className="vscode-title">{title}</div>
            </div>
            <div className="vscode-content">{children}</div>
        </div>
    );
};

CodeFrameWindow.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default CodeFrameWindow;
