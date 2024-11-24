import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = () => {
    const contentRef = useRef(null);
    const isAnimatingRef = useRef(false);

    const text = 'Taichi Shirakawa';
    const symbols = '_!&/?%=@';
    const totalDuration = 0.5;
    const charDuration = totalDuration / text.length;
    const symbolInterval = 0.01;

    const firstAnimationDelay = 1.0;
    const clickAnimationDelay = 0.5;

    const animateText = useCallback((startDelay) => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        const contentElement = contentRef.current;

        let currentText = Array.from({ length: text.length }, () =>
            symbols[Math.floor(Math.random() * symbols.length)]
        );

        let timeline = gsap.timeline({
            onComplete: () => {
                isAnimatingRef.current = false;
            },
        });
        timeline.to({}, { duration: startDelay });

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
    }, [text, symbols, charDuration, symbolInterval]);

    useEffect(() => {
        animateText(firstAnimationDelay);

        const contentElement = contentRef.current;

        const handleClick = () => animateText(clickAnimationDelay);
        contentElement.addEventListener('click', handleClick);

        return () => {
            contentElement.removeEventListener('click', handleClick);
        };
    }, [animateText, clickAnimationDelay, firstAnimationDelay]);

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
