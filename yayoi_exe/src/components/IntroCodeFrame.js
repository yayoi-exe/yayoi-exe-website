import React from "react";
import { useNavigate } from "react-router-dom";
import CodeFrameWindow from "./CodeFrameWindow";
import CodeContent from "./CodeContent";

const CodeFrame = () => {

    return (
        <CodeFrameWindow title="AboutMe.js">
            <CodeContent />
        </CodeFrameWindow>
    );
};

export default CodeFrame;
