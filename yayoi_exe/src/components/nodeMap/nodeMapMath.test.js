import {
    MIN_DEGREE,
    buildEdges,
    createRng,
    nodeCountForArea,
    todayKey,
    getDailySeed,
    wrap,
} from './nodeMapMath';

test('createRng returns the same sequence for the same seed', () => {
    const a = createRng(12345);
    const b = createRng(12345);
    const seqA = [a(), a(), a(), a(), a()];
    const seqB = [b(), b(), b(), b(), b()];
    expect(seqA).toEqual(seqB);
});

test('createRng returns different sequences for different seeds', () => {
    const a = createRng(1);
    const b = createRng(2);
    expect([a(), a(), a()]).not.toEqual([b(), b(), b()]);
});

test('nodeCountForArea clamps between 12 and 28', () => {
    expect(nodeCountForArea(1, 1)).toBe(12);
    expect(nodeCountForArea(10000, 10000)).toBe(28);
    expect(nodeCountForArea(600, 800)).toBe(
        Math.max(12, Math.min(28, Math.round((600 * 800) / 42000)))
    );
});

test('buildEdges ensures every node has at least MIN_DEGREE connections', () => {
    // 互いに LINK_DISTANCE より遠く配置し、補完パスが動くようにする
    const projected = [
        { px: 0, py: 0 },
        { px: 500, py: 0 },
        { px: 0, py: 500 },
        { px: 500, py: 500 },
        { px: 250, py: 250 },
    ];
    const edges = buildEdges(projected);
    const degree = new Array(projected.length).fill(0);
    edges.forEach(({ i, j }) => {
        degree[i] += 1;
        degree[j] += 1;
    });
    degree.forEach((d) => {
        expect(d).toBeGreaterThanOrEqual(MIN_DEGREE);
    });
});

test('todayKey formats local date as YYYY-MM-DD', () => {
    expect(todayKey(new Date(2026, 7, 1))).toBe('2026-08-01');
});

test('getDailySeed is stable for the same visitor seed and date', () => {
    const date = new Date(2026, 7, 1);
    expect(getDailySeed(42, date)).toBe(getDailySeed(42, date));
    expect(getDailySeed(42, date)).not.toBe(getDailySeed(99, date));
});

test('wrap keeps values in the unit interval by toroidal wrap', () => {
    expect(wrap(-0.1)).toBeCloseTo(0.9);
    expect(wrap(1.2)).toBeCloseTo(0.2);
    expect(wrap(0.5)).toBe(0.5);
});
