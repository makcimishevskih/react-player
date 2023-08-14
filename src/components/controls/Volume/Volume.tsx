import css from './Volume.module.scss';

import {
    ChangeEvent,
    FC,
    RefObject,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { FaVolumeDown, FaVolumeOff, FaVolumeUp } from 'react-icons/fa';

interface IVolumeProps {
    // eslint-disable-next-line
    // changeHandler: (e?: any) => void;
    // duration: number;
    currentTime: number;
    audioRef: RefObject<HTMLAudioElement>;
}

const Volume: FC<IVolumeProps> = ({ audioRef }) => {
    const [volume, setVolume] = useState<number>(0);

    const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const value = +e.target.value;
            setVolume(value);
            audioRef.current.volume = value;
        }
    };
    useEffect(() => {
        const initialAudioData = () => {
            if (audioRef.current) {
                setVolume(Math.round(audioRef.current.volume));
            }
        };

        audioRef.current?.addEventListener('loadedmetadata', initialAudioData);

        return () =>
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audioRef.current?.removeEventListener(
                'loadedmetadata',
                initialAudioData
            );
    }, []);

    const toggleVolume = () => {
        if (audioRef.current) {
            if (volume) {
                window.localStorage.setItem('volume', String(volume));
                setVolume(0);
                audioRef.current.volume = 0;
            } else {
                audioRef.current.volume;
                const time = window.localStorage.getItem('volume');
                if (time) {
                    setVolume(+time);
                    audioRef.current.volume = +time;
                }
            }
        }
    };

    const renderVolumeBtn = useCallback(
        (volume: number) => {
            return volume === 0 ? (
                <FaVolumeOff onClick={toggleVolume} color="white" size={40} />
            ) : volume > 0.6 ? (
                <FaVolumeUp onClick={toggleVolume} color="white" size={40} />
            ) : (
                <FaVolumeDown onClick={toggleVolume} color="white" size={40} />
            );
        },
        [volume]
    );

    return (
        <div className={css.volumeBtn}>
            {renderVolumeBtn(volume)}
            <div className={css.wrap}>
                <div className={css.volume}>
                    <input
                        min={0}
                        max={1}
                        step="0.01"
                        name="volume"
                        onChange={handleVolume}
                        value={volume}
                        className={css.volumeBar}
                        type="range"
                    />
                    <div
                        style={{ width: volume * 100 + '%' }}
                        className={css.progress}
                    />
                </div>
            </div>
        </div>
    );
};
export default Volume;
