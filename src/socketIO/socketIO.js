import {io} from '../../bin/www.js';

let broadcaster;
let chatRoomData = [];
const connectedClient = [{}];

export function listeningSocketIO() {
  io.on('connection', socket => {
    console.log('New client connected');

    /*    let broadcaster;
        socket.on('broadcaster', () => {
          broadcaster = socket.id;
          socket.broadcast.emit('broadcaster');
        });
        socket.on('watcher', () => {
          socket.to(broadcaster).emit('watcher', socket.id);
        });
        socket.on('disconnect', () => {
          socket.to(broadcaster).emit('disconnectPeer', socket.id);
        });
        socket.on('offer', (id, message) => {
          socket.to(id).emit('offer', socket.id, message);
        });
        socket.on('answer', (id, message) => {
          socket.to(id).emit('answer', socket.id, message);
        });
        socket.on('candidate', (id, message) => {
          socket.to(id).emit('candidate', socket.id, message);
        });*/

    socket.on('create-room', ({roomName, username}) => {
      socket.join(roomName);
      console.log(`${username} create ${roomName}`);
    });

    socket.on('join-room', ({roomName, username}) => {
      socket.join(roomName);
      io.to(`${roomName}`).emit('host-update-chat', `${username} joined`);
      console.log(`${username} join room ${roomName}`);
    });

    socket.on('host-updated-chat', (message) => {
      console.log(message);
      io.to(roomName).emit('message-for-new-join', {message, roomName});
    });

    //Client Sent a message
    socket.on('send-message', data => {
      io.to(`${data.roomName}`).emit('send-message', data);
      console.log(data);
    });

    //Creating identity for new connected user

    //Clearing Chat room data from server
    socket.on('clear-chat', () => {
      chatRoomData = [];
      console.log(chatRoomData);
      sendUpdatedChatRoomData(socket);
    });

    /*    //webrtc event
        socket.on('broadcaster', () => {
          broadcaster = socket.id;
          socket.broadcast.emit('broadcaster');
        });
        socket.on('watcher', () => {
          socket.to(broadcaster).emit('watcher', socket.id);
        });
        socket.on('offer', (id, message) => {
          socket.to(id).emit('offer', socket.id, message);
        });
        socket.on('answer', (id, message) => {
          socket.to(id).emit('answer', socket.id, message);
        });
        socket.on('candidate', (id, message) => {
          socket.to(id).emit('candidate', socket.id, message);
        });
        socket.on('disconnect', () => {
          socket.to(broadcaster).emit('disconnectPeer', socket.id);
        });*/

  });

//Sending update chat room data to all connected clients
  function sendUpdatedChatRoomData(socket) {
    socket.emit('send-message', chatRoomData);
  }
}



