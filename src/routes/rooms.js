import express from 'express';
import * as roomsController from '../controllers/roomsController.js';

const router = express.Router();

router.get('/get-room/:roomName?', roomsController.getRoom);

router.post('/create-room', roomsController.createRoom);

router.patch('/join-room/:roomName', roomsController.joinRoom);

router.patch('/leave-room/:roomName', roomsController.leaveRoom);

router.delete('/delete-room/:roomName', roomsController.deleteRoom);

export default router;




