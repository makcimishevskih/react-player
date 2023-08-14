import { useEffect } from 'react';

export interface IUseKeyUpAudio {
    togglePlay: () => void;
    handleStop: () => void;
}

export enum KeyCodeT {
    SPACE = 'Space',
    ESCAPE = 'Escape',
}

const useKeyUp = ({ togglePlay, handleStop }: IUseKeyUpAudio) => {
    function handleKeyPress(e: { code: string }) {
        if (e.code) {
            if (e.code === KeyCodeT.SPACE) {
                togglePlay();
            } else if (e.code === KeyCodeT.ESCAPE) {
                handleStop();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => document.removeEventListener('keyup', handleKeyPress);
    });
};

export default useKeyUp;

// document.addEventListener('keydown', e => {
// необходимость использования try/catch обусловлена странным поведением Chrome, связанным с вычислением громкости звука
// попробуйте убрать try/catch и выводить в консоль громкость звука (console.log(audio.volume)) после каждого изменения
// при приближении к 0 и 1 (согласно спецификации значение громкости звука варьируется от 0 до 1) получаем странные значения, которые нивелируют проверки типа if(audio.volume>0 && audio.volume<1)
// использование в проверках "неточных" значений вроде 0.1 и 0.9 решает проблему исключений, но приводит к некорректному изменению громкости звука
// исключения работе плеера не мешают, но раздражают
// try {
// отключаем стандартный функционал клавиатуры
//         e.preventDefault();

//         // пробел
//         // if (e.keyCode == 32) {
//             // пуск/пауза
//             audio.paused ? audio.play() : audio.pause();
//             // enter
//         } else if (e.keyCode == 13) {
//             // стоп
//             audio.load();
//             // стрелка вправо
//         } else if (e.keyCode == 39) {
//             // время воспроизведения + 10 секунд
//             audio.currentTime += 10;
//             // стрелка влево
//         } else if (e.keyCode == 37) {
//             // время воспроизведения - 10 секунд
//             audio.currentTime -= 10;
//             // стрелка вниз
//         } else if (e.keyCode == 40) {
//             // громкость звука - 10%
//             audio.volume -= 0.1;
//             // стрелка вверх
//         } else if (e.keyCode == 38) {
//             // громкость звука + 10%
//             audio.volume += 0.1;
//         }
//         // скрываем исключения
//     } catch {
//         return;
//     }
// });

// // добавляем подсказку
