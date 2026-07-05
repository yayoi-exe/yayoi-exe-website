import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import PhotoFrame from '../components/PhotoFrame';
import TwoColumnLayout from '../components/layout/TwoColumnLayout';

const Main = () => {
    return (
        <TwoColumnLayout>
            <div className="hero-intro">
                <AnimatedTitle />
                <p className="hero-tagline">
                    Software Engineer &amp; Master&apos;s Student,
                    <br />
                    Let&apos;s build something amazing together!
                </p>
                <div className="hero-actions">
                    <Link to="/about" className="hero-cta primary">
                        About me →
                    </Link>
                </div>
            </div>
            <PhotoFrame />
        </TwoColumnLayout>
    );
};

export default Main;
