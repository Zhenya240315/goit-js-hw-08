import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './stor';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const stotageKey = 'videoplayer-current-time';
let currentTime = getStorage(stotageKey);

const onPlay = function (data) {
  setStorage(stotageKey, data.seconds);
  return;
};

player.on('timeupdate', throttle(onPlay, 1000));

// player.setCurrentTime(currentTime);

player.setCurrentTime(currentTime).catch(function (error) {
  setStorage(stotageKey, '0');
  return;
});
