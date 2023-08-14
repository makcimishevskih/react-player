import css from './Stop.module.scss';

import { FC } from 'react';
import { FaStop } from 'react-icons/fa';

interface IStopProps {
    handleStop: () => void;
}

const Stop: FC<IStopProps> = ({ handleStop }) => {
    return (
        <div onClick={handleStop} className={css.stopBtn}>
            <FaStop color="white" size={40} />
            <span></span>
        </div>
    );
};
export default Stop;
