import css from './Stop.module.scss';

import { FC, RefObject } from 'react';
import { FaStop } from 'react-icons/fa';

interface IStopProps {
    handleStop: () => void;
    audioRef: RefObject<HTMLAudioElement>;
}

const Stop: FC<IStopProps> = ({ audioRef, handleStop }) => {
    return (
        <div onClick={handleStop} className={css.stopBtn}>
            <FaStop color="white" size={40} />
            <span></span>
        </div>
    );
};
export default Stop;
