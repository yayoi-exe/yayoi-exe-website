import React from 'react';
import CodeFrameWindow from './CodeFrameWindow';
import IntroCodeContent from './IntroCodeContent';

const IntroCodeFrame = () => {
    return (
        <CodeFrameWindow title="AboutMe.py">
            <IntroCodeContent />
        </CodeFrameWindow>
    );
};

export default IntroCodeFrame;
