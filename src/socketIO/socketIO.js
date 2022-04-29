import {io} from '../../bin/www.js';

export function listeningSocketIO() {
  io.on('connection', socket => {
    console.log('New client connected');

    socket.on('create-room', ({roomName, username}) => {
      socket.join(roomName);
      console.log(`${username} create ${roomName}`);
    });

    socket.on('send-audio', ({blob, roomName}) => {
      socket.broadcast.to(`${roomName}`).emit('board-cast-audio', blob);
    });

    socket.on('disconnect', () => {
      console.log(socket.id + ': disconnected');
    });

    socket.on('join-room', ({roomName, username}) => {
      socket.join(roomName);
      io.to(`${roomName}`).emit('update-audience');
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



