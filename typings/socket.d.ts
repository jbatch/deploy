// Client
type ClientJoin = { username: string; room: string };

type ClientDisconnect = {};

type SocketEvents = {
  // Sent by client
  'client-join': ClientJoin;
  disconnect: ClientDisconnect;
};
