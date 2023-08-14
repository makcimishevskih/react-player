/* eslint-disable */
import { RefObject, useEffect } from 'react';

interface IUseAudio {
    audioRef: RefObject<HTMLAudioElement>;
    isPlay: boolean;
    canPlay: boolean;
    currentSongIndex: number;
    handleIsPlay: (isPlay: boolean) => void;
    handleCanPlay: (canPlay: boolean) => void;
    handleCurrentTime: (number: number) => void;
}

const useAudio = ({
    audioRef,
    isPlay,
    canPlay,
    currentSongIndex,
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
                    const value = currTime;
                    handleCurrentTime(value);
                }
            }, 60);
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
};

export default useAudio;
