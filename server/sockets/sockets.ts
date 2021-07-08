import socketIo from 'socket.io';
import http from 'http';
import pino from 'pino';
import { getSafeSocket } from './safe-socket';

const logger = pino();

export function configureSockets(appServer: http.Server) {
  const server = socketIo(appServer, { pingTimeout: 2000, pingInterval: 10000 });
  logger.info('Started socket.io server on');

  server.on('connect', (client: socketIo.Socket & { username: string }) => {
    logger.info('Client connected');
    const safeSocket = getSafeSocket(client, server);

    // Setup event listeners for client
    safeSocket.safeOn('client-join', handleClientJoin);

    safeSocket.safeOn('disconnect', handleClientDisconnect);

    function handleClientJoin({ username, room }: ClientJoin) {
      logger.info(`${client.id} (${username}) joining game. Room: ${room}`);

      safeSocket.join(room);
    }

    function handleClientDisconnect() {
      logger.info(`${client.id} (${client.username || 'unknown'}) disconnected`);
    }
  });
}
