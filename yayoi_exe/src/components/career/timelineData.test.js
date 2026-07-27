import { buildTimelineItems } from './timelineData';

const fixture = [
    {
        id: 1,
        type: 'education',
        university: 'A College',
        degree: 'Degree A',
        start: 2017,
        end: 2022,
    },
    {
        id: 2,
        type: 'education',
        university: 'B College',
        degree: 'Degree B',
        start: 2022,
        end: 2024,
    },
    { id: 3, type: 'work', company: 'Acme Corp', title: 'Engineer', start: 2024, end: null },
];

test('sorts items with the most recent start year first', () => {
    const result = buildTimelineItems(fixture);
    expect(result.map((item) => item.id)).toEqual([3, 2, 1]);
});

test('marks only the item with a null end date as current', () => {
    const result = buildTimelineItems(fixture);
    expect(result.find((item) => item.id === 3).isCurrent).toBe(true);
    expect(result.find((item) => item.id === 2).isCurrent).toBe(false);
    expect(result.find((item) => item.id === 1).isCurrent).toBe(false);
});

test('uses company/title for work entries and university/degree for education entries', () => {
    const result = buildTimelineItems(fixture);
    const work = result.find((item) => item.id === 3);
    expect(work.title).toBe('Acme Corp');
    expect(work.description).toBe('Engineer');
    const edu = result.find((item) => item.id === 1);
    expect(edu.title).toBe('A College');
    expect(edu.description).toBe('Degree A');
});

test('formats the year range, using 現在 for the ongoing entry', () => {
    const result = buildTimelineItems(fixture);
    expect(result.find((item) => item.id === 3).year).toBe('2024 - 現在');
    expect(result.find((item) => item.id === 1).year).toBe('2017 - 2022');
});
