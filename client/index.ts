import { initialiseSocket, safeOn } from './sockets';

const socket = initialiseSocket();

function init() {
  socket.on('connect', () => {});
}

document.addEventListener('DOMContentLoaded', init);
