import {io} from '../../bin/www.js';

export function createRoom(roomID) {
  io.of('/').adapter.on('create-room', (room) => {
    console.log(`room ${room} was created`);
  });
}

export function joinRoom(roomID) {
  io.of('/').adapter.on('join-room', (roomID, username) => {
    console.log(`socket ${username} has joined room ${roomID}`);
  });
}

export function leaveRoom(roomID) {
  io.on('connection', (socket) => {
    socket.leave(`${roomID}`);
  });
}


