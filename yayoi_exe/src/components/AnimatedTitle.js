import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = () => {
    const contentRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const texts = ['Taichi Shirakawa', 'IT Engineer !!!', 'UX/UI Designer !'];
    const symbols = '_!&/?%=@';
    const totalDuration = 0.5;
    const displayDuration = 2.0;
    const symbolToTextDelay = 0.5;

    const animateText = (text) => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        const contentElement = contentRef.current;

        const currentLength = text.length;
        let currentText = Array.from(text).map(char =>
            char === ' ' ? ' ' : symbols[Math.floor(Math.random() * symbols.length)]
        );

        const charDuration = totalDuration / currentLength;

        let timeline = gsap.timeline({
            onComplete: () => {
                isAnimatingRef.current = false;
            },
        });

        contentElement.textContent = currentText.join('');

        timeline.to({}, {
            duration: symbolToTextDelay,
            onComplete: () => {
                for (let i = 0; i < currentLength; i++) {
                    if (text[i] === ' ') continue;

                    const loopDuration = charDuration;

                    timeline.to({}, {
                        duration: loopDuration,
                        onUpdate: () => {
                            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                            currentText[i] = randomSymbol;
                            contentElement.textContent = currentText.join('');
                        },
                    });

                    timeline.to({}, {
                        duration: 0.01,
                        onComplete: () => {
                            currentText[i] = text[i];
                            contentElement.textContent = currentText.join('');
                        },
                    });
                }
            }
        });

        // 表示中の静止時間（全体）
        timeline.to({}, { duration: displayDuration - symbolToTextDelay - totalDuration });
    };

    useEffect(() => {
        let index = 0;
        const cycleTexts = () => {
            const text = texts[index];
            animateText(text);
            index = (index + 1) % texts.length; // 次の文字列に進む（順番にループ）
        };

        cycleTexts(); // 最初のアニメーションを開始

        const intervalId = setInterval(cycleTexts, displayDuration * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <h1 id="animated-title">
                <span className="prefix">I'm&nbsp;</span>
                <span ref={contentRef}></span>
            </h1>
        </div>
    );
};

export default AnimatedTitle;
