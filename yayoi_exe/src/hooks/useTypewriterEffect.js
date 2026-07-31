import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Narrow glyphs — width further constrained via .is-scramble CSS
const SYMBOLS = '_-+|=*#~';
const SYMBOL_SET = new Set(SYMBOLS.split(''));
const CHAR_ANIMATION_DURATION = 0.06;
const PAUSE_AFTER_REVEAL = 2.8;
const PAUSE_AFTER_SCRAMBLE = 0.6;

const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const padTo = (text, length) => {
    const chars = Array.from(text);
    while (chars.length < length) chars.push(' ');
    return chars.slice(0, length);
};

/**
 * Flow per cycle:
 *   readable → scramble R→L (prev chars only) → hold → reveal L→R into next
 * Readable letters keep proportional width; scramble glyphs are width-capped in CSS.
 */
const useTypewriterEffect = (texts) => {
    const contentRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!texts || texts.length === 0) return undefined;

        const el = contentRef.current;
        if (!el) return undefined;

        const maxLen = Math.max(...texts.map((t) => t.length));
        let index = 0;
        let cancelled = false;
        let slots = [];

        const ensureSlots = () => {
            el.textContent = '';
            slots = Array.from({ length: maxLen }, () => {
                const span = document.createElement('span');
                span.className = 'home-tagline-char';
                span.textContent = ' ';
                el.appendChild(span);
                return span;
            });
        };

        const paint = (chars) => {
            for (let i = 0; i < maxLen; i += 1) {
                const ch = chars[i] ?? ' ';
                slots[i].textContent = ch;
                slots[i].classList.toggle('is-scramble', SYMBOL_SET.has(ch));
            }
        };

        ensureSlots();

        // Lock box width to the longest readable phrase (not scramble glyphs)
        const longest = texts.reduce((a, b) => (a.length >= b.length ? a : b));
        paint(padTo(longest, maxLen));
        const lockedWidth = el.offsetWidth;
        el.style.width = `${lockedWidth}px`;
        el.style.minWidth = `${lockedWidth}px`;

        paint(padTo(texts[0], maxLen));

        const scramblePrevious = (prevText, timeline) => {
            let currentText = [];

            timeline.to(
                {},
                {
                    duration: 0.01,
                    onComplete: () => {
                        currentText = slots.map((slot) => slot.textContent || ' ');
                    },
                }
            );

            for (let i = prevText.length - 1; i >= 0; i -= 1) {
                if (prevText[i] === ' ') {
                    timeline.to(
                        {},
                        {
                            duration: CHAR_ANIMATION_DURATION,
                            onComplete: () => {
                                currentText[i] = ' ';
                                paint(currentText);
                            },
                        }
                    );
                    continue;
                }

                timeline.to(
                    {},
                    {
                        duration: CHAR_ANIMATION_DURATION,
                        onComplete: () => {
                            currentText[i] = randomSymbol();
                            paint(currentText);
                        },
                    }
                );
            }
        };

        const revealNext = (nextText, timeline) => {
            let currentText = [];

            timeline.to(
                {},
                {
                    duration: 0.01,
                    onComplete: () => {
                        currentText = slots.map((slot) => slot.textContent || ' ');
                    },
                }
            );

            for (let i = 0; i < maxLen; i += 1) {
                timeline.to(
                    {},
                    {
                        duration: CHAR_ANIMATION_DURATION,
                        onComplete: () => {
                            currentText[i] = i < nextText.length ? nextText[i] : ' ';
                            paint(currentText);
                        },
                    }
                );
            }
        };

        const runCycle = () => {
            if (cancelled) return;

            const current = texts[index];
            const nextIndex = (index + 1) % texts.length;
            const next = texts[nextIndex];

            const timeline = gsap.timeline({
                onComplete: () => {
                    if (cancelled) return;
                    index = nextIndex;
                    runCycle();
                },
            });
            timelineRef.current = timeline;

            timeline.to({}, { duration: PAUSE_AFTER_REVEAL });
            scramblePrevious(current, timeline);
            timeline.to({}, { duration: PAUSE_AFTER_SCRAMBLE });
            revealNext(next, timeline);
        };

        runCycle();

        return () => {
            cancelled = true;
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            el.style.width = '';
            el.style.minWidth = '';
            el.textContent = '';
        };
    }, [texts]);

    return contentRef;
};

export default useTypewriterEffect;
