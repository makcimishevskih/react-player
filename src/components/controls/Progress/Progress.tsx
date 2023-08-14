/* eslint-disable */
import css from './Progress.module.scss';

import { ChangeEvent, FC, RefObject, useEffect, useState } from 'react';
import { calcSongTime } from '../../../utils/helpers';

// SMOOTH BAR
interface IProgressProps {
    audioRef: RefObject<HTMLAudioElement>;
    currentTime: number;
    handleCurrentTime: (number: number) => void;
    handleIsPlay: (isPlay: boolean) => void;
}

const Progress: FC<IProgressProps> = ({
    audioRef,
    currentTime,
    handleCurrentTime,
    handleIsPlay,
}) => {
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const initialAudioData = () => {
            if (audioRef.current) {
                setDuration(Math.round(audioRef.current.duration));
            }
        };

        audioRef.current?.addEventListener('loadedmetadata', initialAudioData);

        return () =>
            audioRef.current?.removeEventListener(
                'loadedmetadata',
                initialAudioData
            );
    }, []);

    const handleProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const value = +e.target.value;
            audioRef.current.play();
            audioRef.current.currentTime = value;
            handleIsPlay(true);
            handleCurrentTime(value);
        }
    };

    const translateX = `translateX(${-100 + currentTime / (duration / 100)}%)`;

    return (
        <div className={css.progress}>
            <div className={css.currentTime}>{calcSongTime(currentTime)}</div>
            <div className={css.duration}>{calcSongTime(duration)}</div>
            <input
                className={css.progressBar}
                type="range"
                name="progressBar"
                step={1}
                max={duration}
                value={currentTime}
                onChange={handleProgress}
            />
            <div
                className={css.progressBarFill}
                style={{
                    transform: translateX,
                }}
            />
        </div>
    );
};
export default Progress;
