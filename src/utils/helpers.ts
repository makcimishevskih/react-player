export const getRandomSongIndex = (
    playlistArrayLength: number,
    currentSongIndex: number
): number => {
    if (playlistArrayLength === 0) return 0;

    let randomValue = 0;
    const minIndex = 0;
    const maxIndex = playlistArrayLength - 1;

    randomValue = Math.floor(
        Math.random() * (maxIndex - minIndex + 1) + minIndex
    );

    while (randomValue === currentSongIndex) {
        randomValue = Math.floor(
            Math.random() * (maxIndex - minIndex + 1) + minIndex
        );
    }
    return randomValue;
};

export const getTime = (currTime: number, fullTime: number) => {
    const calc = (currTime / (fullTime / 100)).toFixed(3);
    return calc;
};

export const addZero = (num: number): string | number => {
    return num < 10 ? `0${num}` : num;
};

export const calcSongTime = (time: number): string => {
    return `${Math.floor(time / 60)}:${addZero(Math.floor(time) % 60)}`;
};
