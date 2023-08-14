import css from './Prev.module.scss';

import { FC } from 'react';
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { LoopT } from '../../Player/Player';

interface IPrevProps {
    loop: LoopT;
    random: boolean;
    handler: () => void;
    currentSongIndex: number;
}

const Prev: FC<IPrevProps> = ({ loop, random, handler, currentSongIndex }) => {
    return (
        <div onClick={handler} className={css.prevBtn}>
            <TbPlayerTrackPrevFilled
                color="white"
                size="40"
                opacity={currentSongIndex === 0 && !random && !loop ? 0.5 : 1}
            />
            <span></span>
        </div>
    );
};
export default Prev;
