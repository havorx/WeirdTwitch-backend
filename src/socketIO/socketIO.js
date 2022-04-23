import {io} from '../../bin/www.js';

let chatRoomData = [];
let currentTopic = [];

export function listeningSocketIO() {
  io.on('connection', socket => {
    console.log('New client connected');

    socket.on('create-room', ({roomName, username}) => {
      socket.join(roomName);
      console.log(`${username} create ${roomName}`);
    });

    socket.on('send-audio', (data) => {
      socket.broadcast.emit('board-cast-audio', data);
    });

    socket.on('disconnect', () => {
      console.log(socket.id + ': disconnected');
    });

    socket.on('join-room', ({roomName, username}) => {
      socket.join(roomName);
      // io.to(`${roomName}`).emit('host-update-chat', `${username} joined`);
      io.to(`${roomName}`).emit('update-audience');
      const roomTopic = currentTopic.filter(element =>
          element.roomName === roomName);
      io.to(`${roomName}`).emit('update-topic', roomTopic);
      console.log(`${username} join room ${roomName}`);
    });

    socket.on('leave-room', ({roomName, username}) => {
      socket.leave(`${roomName}`);
      io.to(`${roomName}`).emit('update-audience');

      console.log(`${username} has left ${roomName}`);
    });

    socket.on('set-topic', ({topicName, topicDesc, roomName}) => {
      io.to(`${roomName}`).emit('update-topic', {topicName, topicDesc});
      currentTopic.push({topicName, topicDesc, roomName});
      console.log(currentTopic);
      console.log({topicName, topicDesc, roomName});
    });

    socket.on('end-room', ({roomName, username}) => {
      io.in(`${roomName}`).socketsLeave(`${roomName}`);
      console.log(`${username} end ${roomName}`);
    });

    //Client Sent a message
    socket.on('send-message', data => {
      io.to(`${data.roomName}`).emit('send-message', data);
      console.log(data);
    });

    socket.on('audio', data => {
      io.to(`${data.roomName}`).emit('return-audio', data);
    });

    //Creating identity for new connected user

    //Clearing Chat room data from server
    socket.on('clear-chat', () => {
      chatRoomData = [];
      sendUpdatedChatRoomData(socket);
    });
  });

//Sending update chat room data to all connected clients
  function sendUpdatedChatRoomData(socket) {
    socket.emit('send-message', chatRoomData);
  }
}



