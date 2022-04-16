import Room from '../models/Room.js';

export async function createRoom(data) {
  const {roomName, description, roomCategory, roomHost} = data;
  if (roomName && description && roomCategory && roomHost) {
    const liveRoom = await Room.findOne(
        {roomName, description, roomCategory, roomHost}).exec();
    if (liveRoom) {
      return 'room already exist';
    }
    const room = {
      ...data,
    };
    await Room.create(room);
    return room;
  } else
    return false;
}

export async function joinRoomByName(data) {
  if (data) {
    const {roomName, userID} = data;
    if (roomName && userID) {
      const filter = {roomName};
      const room = await Room.findOne(filter).exec();
      if (room) {
        const currentMember = room.members;
        room.members.push(userID);
        return await Room.findOneAndUpdate(filter, {
          members: [...new Set(currentMember)],
        }).exec();
      } else {
        return {message: 'room not existed'};
      }
    } else {
      return 'missing input';
    }
  }
}

export async function deleteRoom(data) {
  const {params, body} = data;
  const {roomName} = params;
  const {isStreamer} = body;
  if (isStreamer && roomName) {
    const {roomName} = data;
    const filter = {roomName};
    return await Room.findOneAndDelete(filter).exec();
  } else {
    return 'delete room fail';
  }
}

export async function leaveRoom(data) {
  const {params, body} = data;
  const {userID} = body.userID;
  const {roomName} = params.roomName;
  if (roomName && userID) {
    const filter = {roomName};
    const room = await Room.findOne(filter).exec();
    const currentMember = new Set(room.members);
    const result = currentMember.delete(userID);
    if (result) {
      return 'user not found';
    }
    return await Room.findOneAndUpdate(filter,
        {members: [...new Set(currentMember)]}).exec();
  } else {
    return 'missing input';
  }
}

export async function getRoom(data) {
  const {roomName} = data;
  const filter = roomName ? {roomName} : {};
  const room = await Room.find(filter).populate('members').exec();
  if (roomName && room.length === 0) {
    return 'room not exist';
  }
  return room;
}

export async function updateRoom(data) {
  const {roomName, userID, isStreamer} = data;
}
