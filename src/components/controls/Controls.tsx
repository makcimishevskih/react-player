/* eslint-disable no-unused-vars */
import css from './Controls.module.scss';

import { FC, RefObject, useState } from 'react';

import { ISong, LoopT } from '../Player/types';

import BtnWrapper from '../BtnWrapper/BtnWrapper';
import {
    Stop,
    Random,
    Next,
    Prev,
    PlayPause,
    Loop,
    Volume,
} from './btnsImports';
import useAudio from '../../hooks/useAudio';
import useKeyUp from '../../hooks/useKeyUp';
import { getRandomSongIndex } from '../../utils/helpers';
import DefaultAudio from '../DefaultAudio/DefaultAudio';

interface IControlsProps {
    audioRef: RefObject<HTMLAudioElement>;
    song: ISong;
    isPlay: boolean;
    currentTime: number;
    playlistArray: ISong[];
    currentSongIndex: number;
    togglePlay: () => void;
    handleIsPlay: (isPlay: boolean) => void;
    handleCurrentTime: (number: number) => void;
    handleCurrentSongIndex: (number: number) => void;
}

const Controls: FC<IControlsProps> = ({
    audioRef,
    song,
    isPlay,
    currentTime,
    playlistArray,
    currentSongIndex,
    togglePlay,
    handleIsPlay,
    handleCurrentTime,
    handleCurrentSongIndex,
}) => {
    const [loop, setLoop] = useState<LoopT>(false);
    const [random, setRandom] = useState<boolean>(false);
    const [canPlay, setCanPlay] = useState<boolean>(false);

    useAudio({
        audioRef,
        isPlay,
        canPlay,
        currentSongIndex,
        handleIsPlay,
        handleCanPlay,
        handleCurrentTime,
    });
    useKeyUp({ togglePlay, handleStop });

    function handleCanPlay(isPlay: boolean) {
        setCanPlay(isPlay);
    }

    function handleStop() {
        if (audioRef.current) {
            audioRef.current.pause();
            handleIsPlay(false);
            handleCurrentTime(0);
        }
    }

    const handleLoop = (loop: LoopT) => {
        setLoop(loop);
    };

    const handleChangeRandom = (isRandom: boolean) => {
        setRandom(isRandom);
    };

    const handlePrev = () => {
        if (playlistArray) {
            const length = playlistArray.length;
            if (random) {
                handleCurrentSongIndex(
                    getRandomSongIndex(length, currentSongIndex)
                );
                return;
            } else if (
                currentSongIndex === 0 &&
                typeof loop === 'boolean' &&
                !loop
            ) {
                handleCurrentSongIndex(length - 1);
                return;
            } else if (currentSongIndex === 0) return;

            handleCurrentSongIndex(currentSongIndex - 1);
        }
    };

    const handleNext = () => {
        if (playlistArray) {
            const lastIndex = playlistArray.length - 1;
            if (random) {
                handleCurrentSongIndex(
                    getRandomSongIndex(playlistArray.length, currentSongIndex)
                );
                return;
            } else if (
                currentSongIndex === lastIndex &&
                typeof loop === 'boolean' &&
                loop
            ) {
                handleCurrentSongIndex(0);
                return;
            } else if (currentSongIndex === lastIndex) return;

            handleCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const handleRandom = () => {
        setRandom(prev => !prev);
        handleLoop(false);
        // audioRef.current && (audioRef.current.loop = false);
    };

    const playlistLength = playlistArray && playlistArray.length;

    const controlButtons = [
        {
            name: 'play-pause',
            component: <PlayPause isPlay={isPlay} togglePlay={togglePlay} />,
        },
        {
            name: 'stop',
            component: <Stop handleStop={handleStop} />,
        },
        {
            name: 'volume',
            component: <Volume audioRef={audioRef} currentTime={currentTime} />,
        },
        {
            name: 'loop',
            component: (
                <Loop
                    audioRef={audioRef}
                    loop={loop}
                    handleLoop={handleLoop}
                    handleChangeRandom={handleChangeRandom}
                />
            ),
        },
        {
            name: 'prev',
            component: (
                <Prev
                    loop={loop}
                    random={random}
                    handler={handlePrev}
                    currentSongIndex={currentSongIndex}
                />
            ),
        },
        {
            name: 'next',
            component: (
                <Next
                    loop={loop}
                    random={random}
                    handler={handleNext}
                    playlistArrayLen={playlistLength}
                    currentSongIndex={currentSongIndex}
                />
            ),
        },
        {
            name: 'random',
            component: <Random random={random} handleRandom={handleRandom} />,
        },
    ];

    return (
        <div className={css.controls}>
            {controlButtons.map(({ name, component }) => (
                <BtnWrapper key={name}>{component}</BtnWrapper>
            ))}

            <DefaultAudio
                audioRef={audioRef}
                song={song}
                loop={loop}
                random={random}
                playlistArrayLen={playlistLength}
                currentSongIndex={currentSongIndex}
                handleStop={handleStop}
                handleCurrentSongIndex={handleCurrentSongIndex}
            />
        </div>
    );
};
export default Controls;
