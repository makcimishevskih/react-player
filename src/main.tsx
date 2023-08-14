import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Player from './components/Player/Player';

import izzamp3 from './assets/song/izzamuzzic-raindrop.mp3';
import kremer1mp3 from './assets/song/kremer-allemanda.mp3';
import kremer2mp3 from './assets/song/kremer-sol-sueno.mp3';
import kremer3mp3 from './assets/song/kremer-soledad.mp3';

const arr = [
    { id: 1, name: 'izza', src: izzamp3 },
    { id: 2, name: 'kremer1', src: kremer1mp3 },
    { id: 3, name: 'kremer2', src: kremer2mp3 },
    { id: 4, name: 'kremer3', src: kremer3mp3 },
];

// 1. FORMATS AUDIO
//   <source src={izzamp3} type="audio/mpeg" />
//   <source src={kremer1mp3} type="audio/mpeg" />
//   Your browser does not support the audio element.
// 2.
//   COMPONENT PLAYER APPLY ARRAY OF OBJECTS WITH {src: songname}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Player playlistArray={arr} />
    </StrictMode>
);
