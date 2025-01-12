import React from "react";
import { useNavigate } from "react-router-dom";
import CodeFrameWindow from "./CodeFrameWindow";

const ImageFrame = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/about");
    };

    return (
        <CodeFrameWindow title="Photograph.png" onClick={handleClick}>
            <div className="photo-container">
                <img
                    src="/images/Taichi_Shirakawa_publicity_photograph.jpg"
                    alt="profile"
                    className="profile-photo"
                />
            </div>
        </CodeFrameWindow>
    );
};

export default ImageFrame;
