import React from 'react';
import PhotoFrame from '../components/PhotoFrame';
import IntroCodeFrame from '../components/IntroCodeFrame';
import TwoColumnLayout from '../components/layout/TwoColumnLayout';

const About = () => {
    return (
        <TwoColumnLayout>
            <PhotoFrame />
            <IntroCodeFrame />
        </TwoColumnLayout>
    );
};

export default About;
