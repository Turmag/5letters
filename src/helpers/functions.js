export const declOfNum = (n, titles) =>
    titles[
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
    ];

export const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

export const getStorage = key => {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage).data : false;
};

export const setStorage = ({ data, key }) => {
    localStorage.setItem(
        key,
        JSON.stringify({
            data,
        })
    );
};
