import express from 'express';
import Room from '../models/Room.js';
import {verifyUser} from '../auth/authenticate.js';
import Category from '../models/Category.js';
// import {createRoom} from '../socketIO/socketIO.js';

const router = express.Router();

router.post('/create-room', async (req, res, next) => {
  const room = new Room({
    roomName: req.body.roomName,
    description: req.body.description,
    roomCategory: req.body.category,
    roomHost: req.body.roomHost,
  });
  console.log(req.body);
  try {
    await room.save();
    // await createRoom();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.get('/roomByName', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query);
      const {roomName} = req.query;
      const room = await Room.findOne({roomName: roomName}).populate('members');
      if (!room) {
        return res.status(400).send({
          'message': 'room not found',
        });
      } else res.status(200).send(room);
    } else res.status(400);
  } catch (err) {
    next(err);
  }
});

router.get('/all-room', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query);
      const {categoryName} = req.query;
      const room = await Room.find({category: categoryName});
      if (!room) {
        return res.status(400).send({
          'message': 'room not found',
        });
      } else res.status(200).send(room);
    } else {
      const room = await Room.find().populate('members');
      if (!room) {
        res.status(404).send({
          'message': 'no room available',
        });
      } else {
        res.status(200).send(room);
      }
    }
  } catch (err) {
    next(err);
  }

});

router.patch('/join-room', async (req, res, next) => {
  const roomName = req.body.roomName;
  const room = await Room.findOne({roomName: roomName}).populate('members');
  if (!room) {
    res.status(404).send({
      'message': 'room not existed',
    });
  } else {
    console.log(room.members);
    room.members.push(req.body.userID);
    await room.save(error => {
      if (error) {
        next(error);
      } else {
        res.status(200).send(room);
      }
    });
  }
});

router.patch('/leave-room', async (req, res, next) => {
  const roomName = req.body.roomName;
  const room = await Room.findOne({roomName: roomName}).populate('members');
  if (!room) {
    res.status(404).send({
      'message': 'room not existed',
    });
  } else {
    const userID = req.body.userID;
    if (req.body.isStreamer) {
      if (req.body.username === room.roomHost) {
        await room.deleteOne();
        res.status(200).send(room);
      }
    } else {
      console.log(userID);
      const currentMember = room.members.findIndex(
          element => element._id.toString() === userID);
      if (currentMember > -1) {
        room.members.splice(currentMember, 1);
        await room.save(error => {
          if (error) {
            next(error);
          } else {
            res.status(200).send(room);
          }
        });
      } else res.status(404).send({
        'message': 'user not in room',
      });
    }
  }
});

router.delete('/delete-room', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const {ID} = req.query;
      const room = await Room.findById(ID);
      if (!room) {
        res.status(404).send({
          'message': 'room not existed',
        });
      } else {
        await room.deleteOne();
        res.status(200).send(room);
      }
    }
  } catch (err) {
    next(err);
  }
});

export default router;




