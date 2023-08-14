import css from './DefaultAudio.module.scss';

import { FC, RefObject } from 'react';
import { ISong, LoopT } from '../Player/types';
import { getRandomSongIndex } from '../../utils/helpers';

interface IDefaultAudioProps {
    audioRef: RefObject<HTMLAudioElement>;
    song: ISong;
    loop: LoopT;
    random: boolean;
    currentSongIndex: number;
    playlistArrayLen: number;
    handleStop: () => void;
    handleCurrentSongIndex: (index: number) => void;
}

export const DefaultAudio: FC<IDefaultAudioProps> = ({
    audioRef,
    song,
    loop,
    random,
    currentSongIndex,
    playlistArrayLen,
    handleStop,
    handleCurrentSongIndex,
}) => {
    const handleEnded = () => {
        if (audioRef.current && playlistArrayLen) {
            const isEnded = audioRef.current.ended;
            const lastIndex = playlistArrayLen - 1;

            if (random) {
                const randomValue = getRandomSongIndex(
                    playlistArrayLen,
                    currentSongIndex
                );

                handleCurrentSongIndex(randomValue);
            } else {
                if (isEnded) {
                    if (currentSongIndex !== lastIndex) {
                        if (loop !== 'one') {
                            handleCurrentSongIndex(currentSongIndex + 1);
                        }
                    } else if (loop) {
                        handleCurrentSongIndex(0);
                    }
                }
            }

            handleStop();
        }
    };
    return (
        <audio
            className={css.defaultAudio}
            ref={audioRef}
            controls
            preload="metadata"
            onEnded={handleEnded}
            src={song && song.src}
        />
    );
};

export default DefaultAudio;
