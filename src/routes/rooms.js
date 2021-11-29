import express from 'express';
import Room from '../models/Room.js';
import {verifyUser} from '../auth/authenticate.js';
// import {createRoom} from '../socketIO/socketIO.js';

const router = express.Router();

router.post('/create-room', async (req, res, next) => {
  const host = res.locals.currentUser;
  // console.log(host.username);
  const room = new Room({
    // roomID: req.body.roomID,
    roomName: req.body.roomName,
    roomDescription: req.body.roomDescription,
    roomHost: req.body.roomHost,
  });
  try {
    await room.save();
    // await createRoom();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.delete('/delete-room', verifyUser, async (req, res, next) => {
 await Room.deleteOne({roomName: req.body.roomName}, err => {
    if (err) {
      next(err);
    } else
      res.status(200);
      res.json('deleted');
  })

});

router.get('/all-room', async (req, res) => {
  console.log(res.locals.currentUser);

});

router.get('/join-room', async (req, res) => {
  const roomID = req.body.roomName;
  const room = await Room.findOne({roomID: roomID}).exec();
  if (!room) {
    res.status(400).send({
      'message': 'room not existed',
    });
  } else
    res.json(room);
});

export default router;




