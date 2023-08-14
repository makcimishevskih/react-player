import css from './Next.module.scss';

import { FC } from 'react';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { LoopT } from '../../Player/types';

interface INextProps {
    loop: LoopT;
    random: boolean;
    handler: () => void;
    playlistArrayLen: number;
    currentSongIndex: number;
}

const Next: FC<INextProps> = ({
    loop,
    random,
    handler,
    currentSongIndex,
    playlistArrayLen,
}) => {
    return (
        <div onClick={handler} className={css.prevBtn}>
            <TbPlayerTrackNextFilled
                color="white"
                size="40"
                opacity={
                    currentSongIndex === playlistArrayLen - 1 &&
                    !random &&
                    !loop
                        ? 0.5
                        : 1
                }
            />
            <span></span>
        </div>
    );
};
export default Next;
