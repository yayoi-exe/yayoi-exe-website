export function buildTimelineItems(educationData) {
    return [...educationData]
        .sort((a, b) => b.start - a.start)
        .map((data) => {
            const isCurrent = data.end === null;
            return {
                id: data.id,
                title: data.type === 'education' ? data.university : data.company,
                description: data.type === 'education' ? data.degree : data.title,
                year: isCurrent ? `${data.start} - Present` : `${data.start} - ${data.end}`,
                isCurrent,
            };
        });
}
