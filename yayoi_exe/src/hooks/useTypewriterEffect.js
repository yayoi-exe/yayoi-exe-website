import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SYMBOLS = '_!&/?%=@';
const TOTAL_DURATION = 0.5;
const SYMBOL_TO_TEXT_DELAY = 0.5;
const PAUSE_AFTER_REVEAL = 1.0;

const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

/**
 * Cycles through the given texts, animating each one with a "scrambling symbols"
 * typewriter effect. Returns a ref that must be attached to the text container.
 * Each phrase's animation is chained off the previous one's completion (not a
 * fixed-period timer), so the cycle is always exactly as long as the animation
 * actually takes and no phrase is ever skipped.
 */
const useTypewriterEffect = (texts) => {
    const contentRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!texts || texts.length === 0) return undefined;

        let index = 0;
        let cancelled = false;

        const animateText = (text, onDone) => {
            const contentElement = contentRef.current;
            if (!contentElement) {
                onDone();
                return;
            }

            const currentLength = text.length;
            const currentText = Array.from(text).map((char) =>
                char === ' ' ? ' ' : randomSymbol()
            );
            const charDuration = TOTAL_DURATION / currentLength;

            const timeline = gsap.timeline({ onComplete: onDone });
            timelineRef.current = timeline;

            contentElement.textContent = currentText.join('');

            timeline.to({}, { duration: SYMBOL_TO_TEXT_DELAY });

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

            timeline.to({}, { duration: PAUSE_AFTER_REVEAL });
        };

        const cycle = () => {
            if (cancelled) return;
            animateText(texts[index], () => {
                if (cancelled) return;
                index = (index + 1) % texts.length;
                cycle();
            });
        };

        cycle();

        return () => {
            cancelled = true;
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [texts]);

    return contentRef;
};

export default useTypewriterEffect;
