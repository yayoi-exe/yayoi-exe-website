import React, { useEffect, useRef } from 'react';
import {
    createNodes,
    createRng,
    drawFrame,
    getDailySeed,
    getVisitorSeed,
    nodeCountForArea,
} from './nodeMap/nodeMapMath';

const NodeMapBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const seed = getDailySeed(getVisitorSeed());
        let nodes = [];
        let rafId = 0;
        let width = 0;
        let height = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            // 親（コンテンツ領域）に合わせる。window 全画面だとヘッダー下も毎フレーム再描画され帯がチカチカする
            width = parent.clientWidth;
            height = parent.clientHeight;
            if (width === 0 || height === 0) return;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const nextCount = nodeCountForArea(width, height);
            // 同じシード + 同じ個数なら同一配置。個数が変わったときだけ作り直す
            if (nodes.length !== nextCount) {
                nodes = createNodes(nextCount, createRng(seed));
            }
            drawFrame(ctx, width, height, nodes, false);
        };

        const tick = () => {
            drawFrame(ctx, width, height, nodes, true);
            rafId = requestAnimationFrame(tick);
        };

        const start = () => {
            cancelAnimationFrame(rafId);
            resize();
            if (!reduceMotion.matches) {
                rafId = requestAnimationFrame(tick);
            }
        };

        const onMotionChange = () => start();
        const observer = new ResizeObserver(() => resize());
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        start();
        reduceMotion.addEventListener('change', onMotionChange);

        return () => {
            cancelAnimationFrame(rafId);
            observer.disconnect();
            reduceMotion.removeEventListener('change', onMotionChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
            aria-hidden="true"
        />
    );
};

export default NodeMapBackground;
