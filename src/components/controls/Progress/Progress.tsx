import css from './Progress.module.scss';

import { ChangeEvent, FC, RefObject, useEffect, useState } from 'react';
import { calcSongTime, getTime } from '../../../utils/helpers';

interface IProgressProps {
    audioRef: RefObject<HTMLAudioElement>;
    currentTime: number;
    // eslint-disable-next-line no-unused-vars
    handleCurrentTime: (number: number) => void;
}

const Progress: FC<IProgressProps> = ({
    audioRef,
    currentTime,
    handleCurrentTime,
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
            // eslint-disable-next-line
            audioRef.current?.removeEventListener(
                'loadedmetadata',
                initialAudioData
            );
        // eslint-disable-next-line
    }, []);

    // audioRef.current.currentTime = value;
    const handleProgress = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const value = +e.target.value;
            handleCurrentTime(value);
        }
    };

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
                // CHANGE WIDTH ON TRANSFORM TRANSLATE BLOCK
                style={{
                    width: `${getTime(currentTime, duration)}%`,
                }}
                className={css.progressBarFill}
            />
        </div>
    );
};
export default Progress;
