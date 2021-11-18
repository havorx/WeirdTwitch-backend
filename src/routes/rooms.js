import express from 'express';
import Room from '../models/Room.js';
import {createRoom, joinRoom, leaveRoom} from '../socketIO/socketIO.js';

const router = express.Router();

router.post('/create-room', async (req, res, next) => {
  const host = res.locals.currentUser;
  const room = new Room({
    roomID: req.body.roomID,
    roomName: req.body.roomName,
    roomStatus: req.body.roomStatus,
    roomLanguage: req.body.roomLanguage,
    roomHost: host._id,
  });
  try {
    await room.save();
    await createRoom(req.body.roomID);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.get('/all-room', async (req, res) => {
  console.log(res.locals.currentUser);
  const rooms = await Room.find({}).populate('roomHost', 'username').exec();
  if (!rooms) {
    return res.status(400).send({
      'message': 'not found',
    });
  } else
    res.json(rooms);
});

router.get('/join-room/:roomID', async (req, res) => {
  const roomID = req.params.roomID;
  const room = await Room.findOne({roomID: roomID}).exec();
  if (!room) {
    res.status(400).send({
      'message': 'room not existed',
    });
  } else
    res.json(room);
});

export default router;




