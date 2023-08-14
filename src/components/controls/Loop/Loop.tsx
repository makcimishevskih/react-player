import css from './Loop.module.scss';

import { FC, RefObject } from 'react';
import { ImLoop2 } from 'react-icons/im';
import { LoopT } from '../../Player/types';

interface ILoopProps {
    // eslint-disable-next-line
    handleChangeRandom: (isRandom: boolean) => void;
    audioRef: RefObject<HTMLAudioElement>;
    loop: LoopT;
    // eslint-disable-next-line no-unused-vars
    handleLoop: (loop: LoopT) => void;
}

const Loop: FC<ILoopProps> = ({
    loop,
    handleLoop,
    audioRef,
    handleChangeRandom,
}) => {
    function handleToggleLoop() {
        if (audioRef.current) {
            handleChangeRandom(false);
            switch (loop) {
                case false:
                    handleLoop('one');
                    audioRef.current.loop = true;
                    break;
                case 'one':
                    handleLoop(true);
                    audioRef.current.loop = false;
                    break;
                default:
                    handleLoop(false);
                    audioRef.current.loop = false;
                    break;
            }
        }
    }
    return (
        <div className={css.loopBtn} onClick={handleToggleLoop}>
            <ImLoop2
                color={loop || typeof loop === 'string' ? 'yellow' : 'white'}
                size={40}
            />
            {loop === 'one' && <span style={{ color: 'white' }}>1</span>}
        </div>
    );
};
export default Loop;
