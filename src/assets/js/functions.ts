export const declOfNum = (n: number, titles: string[]) =>
    titles[
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
    ];

export const getRandom = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};
