/* eslint-disable */
import { RefObject, useEffect } from 'react';
import { KeyCodeT } from './useKeyUp';

interface IUseAudio {
    audioRef: RefObject<HTMLAudioElement>;
    isPlay: boolean;
    canPlay: boolean;
    currentSongIndex: number;
    togglePlay: () => void;
    handleIsPlay: (isPlay: boolean) => void;
    handleCanPlay: (canPlay: boolean) => void;
    handleCurrentTime: (number: number) => void;
}

const useAudio = ({
    audioRef,
    isPlay,
    canPlay,
    currentSongIndex,
    togglePlay,
    handleIsPlay,
    handleCanPlay,
    handleCurrentTime,
}: IUseAudio) => {
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isPlay) {
            timer = setInterval(() => {
                if (audioRef.current) {
                    const currTime: number = audioRef.current.currentTime;
                    const value = Math.floor(currTime);
                    console.log(value);
                    handleCurrentTime(value);
                }
            }, 500);
        }
        return () => clearInterval(timer);
        // eslint-disable-next-line
    }, [isPlay]);

    useEffect(() => {
        if (audioRef.current && !canPlay) {
            audioRef.current.autoplay = true;
            handleCanPlay(true);
        } else {
            handleIsPlay(true);
        }
    }, [currentSongIndex]);

    useEffect(() => {
        function handleKeyPress(e: { code: string }) {
            if (e.code && e.code === KeyCodeT.SPACE) {
                togglePlay();
            }
        }
        document.addEventListener('keyup', handleKeyPress);
        return () => document.removeEventListener('keyup', handleKeyPress);
    });
};

export default useAudio;
