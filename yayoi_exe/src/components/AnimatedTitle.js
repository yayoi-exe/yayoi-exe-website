import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/animatedTitle.css';

const AnimatedTitle = () => {
    const contentRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const texts = ['Taichi Shirakawa', 'IT Engineer', 'UX/UI Designer']; // 表示する肩書き
    const symbols = '_!&/?%=@';
    const totalDuration = 0.5; // 記号アニメーション全体の時間
    const displayDuration = 2.0; // 各文字列を表示する総時間
    const symbolToTextDelay = 0.5; // symbols が表示され続ける時間

    const animateText = (text) => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        const contentElement = contentRef.current;

        // 現在の文字列の長さに合わせた記号の配列
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

        // 記号をランダムに表示
        contentElement.textContent = currentText.join('');

        // symbols 表示の静止時間
        timeline.to({}, {
            duration: symbolToTextDelay,
            onComplete: () => {
                // 記号から文字列に変換
                for (let i = 0; i < currentLength; i++) {
                    if (text[i] === ' ') continue; // 空白はそのまま保持

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
