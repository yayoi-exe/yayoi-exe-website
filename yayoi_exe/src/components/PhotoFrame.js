import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/photoFrame.css";

const PhotoFrame = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/about");
    };

    return (
        <div
            className="vscode-window"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div className="vscode-header">
                <div className="vscode-buttons">
                    <span className="vscode-button red"></span>
                    <span className="vscode-button yellow"></span>
                    <span className="vscode-button green"></span>
                </div>
                <div className="vscode-title">Photograph.png</div>
            </div>
            <div className="vscode-content">
                <div className="photo-container">
                    <img
                        src="/images/Taichi_Shirakawa_publicity_photograph.jpg"
                        alt="profile"
                        className="profile-photo"
                    />
                </div>
            </div>
        </div>
    );
};

export default PhotoFrame;
