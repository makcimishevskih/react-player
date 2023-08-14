import css from './PlayPause.module.scss';

import { FC } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface IPlayPauseProps {
    isPlay: boolean;
    togglePlay: () => void;
}

const PlayPause: FC<IPlayPauseProps> = ({ isPlay, togglePlay }) => {
    return (
        <div onClick={togglePlay} className={css.pauseBtn}>
            {isPlay ? (
                <FaPause color="white" size={40} />
            ) : (
                <FaPlay color="white" size={40} />
            )}

            <span></span>
        </div>
    );
};
export default PlayPause;
