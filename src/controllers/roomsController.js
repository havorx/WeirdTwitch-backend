import * as roomsService from '../services/roomsService.js';

export async function createRoom(req, res, next) {
  try {
    const data = req.body;
    const result = await roomsService.createRoom(data);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

export async function getRoom(req, res, next) {
  try {
    const data = req.params;
    const result = await roomsService.getRoom(data);
    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function joinRoom(req, res, next) {
  try {
    const data = req.params;
    const room = await roomsService.joinRoomByName(data);
    return res.status(200).send(room);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function leaveRoom(req, res, next) {
  try {
    const data = {params: req.params, body: req.body};
    const result = await roomsService.leaveRoom(data);
    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteRoom(req, res, next) {
  try {
    const data = {params: req.params, body: req.body};
    const result = await roomsService.deleteRoom(data);
    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
