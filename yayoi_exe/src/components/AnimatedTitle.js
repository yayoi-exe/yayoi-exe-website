import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const contentElement = contentRef.current;
        const text = 'Taichi Shirakawa';
        const symbols = '_!&/?%=@';
        const totalDuration = 1;
        const charDuration = totalDuration / text.length;
        const symbolInterval = 0.01;

        let currentText = Array.from({ length: text.length }, () =>
            symbols[Math.floor(Math.random() * symbols.length)]
        );
        // let currentText = Array(text.length).fill('?');

        let timeline = gsap.timeline();
        timeline.to({}, { duration: 0.5 });

        contentElement.textContent = currentText.join('');

        for (let i = 0; i < text.length; i++) {
            const loopDuration = charDuration - symbolInterval;

            timeline.to({}, {
                duration: loopDuration,
                onUpdate: () => {
                    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    currentText[i] = randomSymbol;
                    contentElement.textContent = currentText.join('');
                },
            });

            timeline.to({}, {
                duration: symbolInterval,
                onComplete: () => {
                    currentText[i] = text[i];
                    contentElement.textContent = currentText.join('');
                },
            });
        }
    }, []);

    return (
        <div className="container">
            <h1 id="animated-title">
                <span className="prefix">I'm </span>
                <span ref={contentRef}></span>
            </h1>
        </div>
    );
};

export default AnimatedTitle;
