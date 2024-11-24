import React from "react";
import { useNavigate } from "react-router-dom";
import CodeFrameWindow from "./CodeFrameWindow";
import IntroCodeContent from "./IntroCodeContent";

const CodeFrame = () => {

    return (
        <CodeFrameWindow title="AboutMe.py">
            <IntroCodeContent />
        </CodeFrameWindow>
    );
};

export default CodeFrame;
