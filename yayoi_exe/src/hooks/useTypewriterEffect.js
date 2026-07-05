import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SYMBOLS = '_!&/?%=@';
const TOTAL_DURATION = 0.5;
const DISPLAY_DURATION = 2.0;
const SYMBOL_TO_TEXT_DELAY = 0.5;

const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

/**
 * Cycles through the given texts, animating each one with a "scrambling symbols"
 * typewriter effect. Returns a ref that must be attached to the text container.
 */
const useTypewriterEffect = (texts) => {
    const contentRef = useRef(null);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        if (!texts || texts.length === 0) return undefined;

        const animateText = (text) => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;

            const contentElement = contentRef.current;
            if (!contentElement) {
                isAnimatingRef.current = false;
                return;
            }

            const currentLength = text.length;
            const currentText = Array.from(text).map((char) =>
                char === ' ' ? ' ' : randomSymbol()
            );
            const charDuration = TOTAL_DURATION / currentLength;

            const timeline = gsap.timeline({
                onComplete: () => {
                    isAnimatingRef.current = false;
                },
            });

            contentElement.textContent = currentText.join('');

            timeline.to(
                {},
                {
                    duration: SYMBOL_TO_TEXT_DELAY,
                    onComplete: () => {
                        for (let i = 0; i < currentLength; i++) {
                            if (text[i] === ' ') continue;

                            timeline.to(
                                {},
                                {
                                    duration: charDuration,
                                    onUpdate: () => {
                                        currentText[i] = randomSymbol();
                                        contentElement.textContent = currentText.join('');
                                    },
                                }
                            );

                            timeline.to(
                                {},
                                {
                                    duration: 0.01,
                                    onComplete: () => {
                                        currentText[i] = text[i];
                                        contentElement.textContent = currentText.join('');
                                    },
                                }
                            );
                        }
                    },
                }
            );

            timeline.to({}, { duration: DISPLAY_DURATION - SYMBOL_TO_TEXT_DELAY - TOTAL_DURATION });
        };

        let index = 0;
        const cycleTexts = () => {
            animateText(texts[index]);
            index = (index + 1) % texts.length;
        };

        cycleTexts();
        const intervalId = setInterval(cycleTexts, DISPLAY_DURATION * 1000);

        return () => clearInterval(intervalId);
    }, [texts]);

    return contentRef;
};

export default useTypewriterEffect;
