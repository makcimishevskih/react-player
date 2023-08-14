import { useEffect } from 'react';

export interface IUseKeyUpAudio {
    togglePlay: () => void;
    handleStop: () => void;
}

export enum KeyCodeT {
    SPACE = 'Space',
    ESCAPE = 'Escape',
}

const useKeyUp = ({ togglePlay, handleStop }: IUseKeyUpAudio) => {
    function handleKeyPress(e: { code: string }) {
        console.log(e.code);
        if (e.code) {
            if (e.code === KeyCodeT.SPACE) {
                togglePlay();
            } else if (e.code === KeyCodeT.ESCAPE) {
                handleStop();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => document.removeEventListener('keyup', handleKeyPress);
    });
};

export default useKeyUp;
