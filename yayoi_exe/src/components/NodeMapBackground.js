import React, { useEffect, useRef } from 'react';
import '../assets/styles/nodeMap.css';

const ACCENT_RGB = { r: 245, g: 183, b: 0 };
const LINK_DISTANCE = 180;
const MAX_SPEED = 0.02;
// 接続が2本以下の点は作らない（各ノード最低3本）
const MIN_DEGREE = 3;
const SEED_STORAGE_KEY = 'yayoi-node-map-seed';

function nodeCountForArea(width, height) {
    const area = width * height;
    return Math.max(12, Math.min(28, Math.round(area / 42000)));
}

/** 訪問者ごとに固定されるベースシードを取得（初回のみランダム生成） */
function getVisitorSeed() {
    try {
        const stored = window.localStorage.getItem(SEED_STORAGE_KEY);
        if (stored != null) {
            const parsed = Number(stored);
            if (Number.isFinite(parsed)) return parsed >>> 0;
        }
        const seed = (Math.random() * 0xffffffff) >>> 0;
        window.localStorage.setItem(SEED_STORAGE_KEY, String(seed));
        return seed;
    } catch {
        // private mode などで localStorage が使えない場合はセッション内だけ固定
        return (Math.random() * 0xffffffff) >>> 0;
    }
}

/** YYYY-MM-DD（ローカル日付）。日付が変わると配置も変わる */
function todayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/** 訪問者シードと日付を混ぜた、その日だけのシード */
function getDailySeed(visitorSeed, date = new Date()) {
    const key = todayKey(date);
    let mixed = visitorSeed >>> 0;
    for (let i = 0; i < key.length; i += 1) {
        mixed = Math.imul(mixed ^ key.charCodeAt(i), 0x9e3779b1) >>> 0;
    }
    return mixed;
}

/** mulberry32 — 同じシードなら常に同じ乱数列を返す */
function createRng(seed) {
    let t = seed >>> 0;
    return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function createNodes(count, random) {
    return Array.from({ length: count }, () => ({
        x: random(),
        y: random(),
        z: random(),
        vx: (random() - 0.5) * MAX_SPEED * 0.008,
        vy: (random() - 0.5) * MAX_SPEED * 0.008,
        vz: (random() - 0.5) * MAX_SPEED * 0.004,
    }));
}

function wrap(value) {
    if (value < 0) return value + 1;
    if (value > 1) return value - 1;
    return value;
}

// z=0 が奥、z=1 が手前。大小差をはっきり出して遠近感を強調する
function depthScale(z) {
    return 0.15 + z * z * 0.85;
}

function edgeKey(i, j) {
    return i < j ? `${i}:${j}` : `${j}:${i}`;
}

/** 近傍接続に加え、各ノードが MIN_DEGREE 本以上つながるよう最近傍へ補完する */
function buildEdges(projected) {
    const n = projected.length;
    const edges = new Map();
    const degree = new Array(n).fill(0);

    const addEdge = (i, j, dist) => {
        if (i === j) return;
        const key = edgeKey(i, j);
        if (edges.has(key)) return;
        edges.set(key, { i: Math.min(i, j), j: Math.max(i, j), dist });
        degree[i] += 1;
        degree[j] += 1;
    };

    for (let i = 0; i < n; i += 1) {
        for (let j = i + 1; j < n; j += 1) {
            const dx = projected[i].px - projected[j].px;
            const dy = projected[i].py - projected[j].py;
            const dist = Math.hypot(dx, dy);
            if (dist < LINK_DISTANCE) {
                addEdge(i, j, dist);
            }
        }
    }

    for (let i = 0; i < n; i += 1) {
        if (degree[i] >= MIN_DEGREE) continue;

        const nearest = [];
        for (let j = 0; j < n; j += 1) {
            if (i === j) continue;
            const dx = projected[i].px - projected[j].px;
            const dy = projected[i].py - projected[j].py;
            nearest.push({ j, dist: Math.hypot(dx, dy) });
        }
        nearest.sort((a, b) => a.dist - b.dist);

        for (let k = 0; k < nearest.length && degree[i] < MIN_DEGREE; k += 1) {
            addEdge(i, nearest[k].j, nearest[k].dist);
        }
    }

    return Array.from(edges.values());
}

function drawFrame(ctx, width, height, nodes, animate) {
    ctx.clearRect(0, 0, width, height);

    const projected = nodes.map((node) => {
        const depth = depthScale(node.z);
        return {
            px: node.x * width,
            py: node.y * height,
            radius: 0.8 + depth * 6.5,
            alpha: 0.18 + depth * 0.45,
            depth,
        };
    });

    const edges = buildEdges(projected);

    // 奥の線から描く
    edges
        .slice()
        .sort((a, b) => {
            const da = (projected[a.i].depth + projected[a.j].depth) / 2;
            const db = (projected[b.i].depth + projected[b.j].depth) / 2;
            return da - db;
        })
        .forEach(({ i, j, dist }) => {
            const a = projected[i];
            const b = projected[j];
            const proximity = Math.max(0, 1 - dist / LINK_DISTANCE);
            // 強制接続（閾値外）も最低限見えるようにする
            const reach =
                dist < LINK_DISTANCE ? proximity : Math.max(0.15, LINK_DISTANCE / dist) * 0.35;
            const avgDepth = (a.depth + b.depth) / 2;
            const alpha = 0.12 + reach * avgDepth * 0.55;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `rgba(${ACCENT_RGB.r}, ${ACCENT_RGB.g}, ${ACCENT_RGB.b}, ${alpha})`;
            ctx.lineWidth = 0.9 + avgDepth * 1.6;
            ctx.stroke();
        });

    projected
        .map((point, index) => ({ point, index }))
        .sort((a, b) => a.point.depth - b.point.depth)
        .forEach(({ point }) => {
            ctx.beginPath();
            ctx.arc(point.px, point.py, point.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT_RGB.r}, ${ACCENT_RGB.g}, ${ACCENT_RGB.b}, ${point.alpha})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(point.px, point.py, point.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT_RGB.r}, ${ACCENT_RGB.g}, ${ACCENT_RGB.b}, ${point.alpha * 0.2})`;
            ctx.fill();
        });

    if (!animate) return;

    nodes.forEach((node) => {
        node.x = wrap(node.x + node.vx);
        node.y = wrap(node.y + node.vy);
        node.z = wrap(node.z + node.vz);
    });
}

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
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
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

        start();
        window.addEventListener('resize', resize);
        reduceMotion.addEventListener('change', onMotionChange);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            reduceMotion.removeEventListener('change', onMotionChange);
        };
    }, []);

    return <canvas ref={canvasRef} className="node-map-background" aria-hidden="true" />;
};

export default NodeMapBackground;
