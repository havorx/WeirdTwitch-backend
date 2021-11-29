import {ExpressPeerServer} from 'peer';

export function initializePeer(server, app) {
  const peerServer = ExpressPeerServer(server, {debug: true, path: '/'});

  app.use('/peerjs', peerServer);

}
