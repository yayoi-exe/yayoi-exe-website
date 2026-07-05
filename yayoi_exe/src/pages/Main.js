import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import TwoColumnLayout from '../components/layout/TwoColumnLayout';

const Main = () => {
    return (
        <TwoColumnLayout>
            <AnimatedTitle />
            <PhotoFrame />
        </TwoColumnLayout>
    );
};

export default Main;
