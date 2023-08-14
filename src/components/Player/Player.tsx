import css from './Player.module.scss';

import izzaImg from '../../assets/izza.jpg';

import { FC, ReactNode, RefObject, useMemo, useRef, useState } from 'react';
import Progress from '../controls/Progress/Progress';

import Controls from '../controls/Controls';
import { ISong } from './types';

export interface IPlayerProps {
    song?: string;
    playlistArray: ISong[];
    autoPlay?: boolean;
    loop?: boolean;
    btnSize?: number;
    btnColor?: string;
}

export interface IButton {
    name: string;
    // eslint-disable-next-line no-unused-vars
    handler: <T>(e: T) => void;
    button: ReactNode;
    spanContent?: string;
    spanStyles?: object;
    wrapperStyles?: object;
}

// ACTIVE HOVER STATES
// BTN SIZES COLORS
// BTN 30SEC
// WRAPPER COMP
// IF RANDOM NEXT AND PREV NOT OPACITY

const Player: FC<IPlayerProps> = ({
    // autoPlay = false,
    // song,
    // loop,
    // btnSize = 30
    // btnColor = 'white'
    // btnActiveColor = 'yellow'
    playlistArray = [],
}) => {
    const audioRef = useRef(null) as RefObject<HTMLAudioElement>;
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

    const song: ISong = useMemo(
        () => playlistArray && playlistArray[currentSongIndex],
        // eslint-disable-next-line
        [currentSongIndex]
    );

    function handleCurrentTime(time: number) {
        if (audioRef.current) {
            setCurrentTime(time);
        }
    }

    function handleCurrentSongIndex(index: number) {
        setCurrentSongIndex(index);
    }

    return (
        <div className="container">
            <div className={css.player}>
                <div className={css.imgWrapper}>
                    <img src={izzaImg} alt="album" />
                </div>
                {song && song.name && (
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                        }}
                    >
                        {song.name}
                    </div>
                )}

                {/* CONTROLS */}
                <Controls
                    song={song}
                    audioRef={audioRef}
                    currentTime={currentTime}
                    currentSongIndex={currentSongIndex}
                    handleCurrentTime={handleCurrentTime}
                    handleCurrentSongIndex={handleCurrentSongIndex}
                    playlistArray={playlistArray && playlistArray}
                />

                {/* PROGRESSBAR */}
                <Progress
                    audioRef={audioRef}
                    currentTime={currentTime}
                    handleCurrentTime={handleCurrentTime}
                />
            </div>
        </div>
    );
};

export default Player;
