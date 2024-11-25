import React from "react";
import "../assets/styles/codeFrameWindow.css";

const CodeFrameWindow = ({ title, children, onClick }) => {
    return (
        <div
            className="vscode-window"
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
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

export default CodeFrameWindow;
