import css from './Random.module.scss';

import { FC } from 'react';
import { FaRandom } from 'react-icons/fa';

interface IRandomProps {
    // audioRef: RefObject<HTMLAudioElement>;
    random: boolean;
    handleRandom: () => void;
}

const Random: FC<IRandomProps> = ({ handleRandom, random }) => {
    return (
        <div onClick={handleRandom} className={css.randomBtn}>
            <FaRandom color={random ? 'yellow' : 'white'} size="40" />
            <span></span>
        </div>
    );
};
export default Random;
