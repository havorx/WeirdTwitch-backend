import * as userService from '../services/userService.js';

export async function addCategoryToUser(req, res, next) {
  try {
    const data = req.body;
    const user = await userService.addCategoryToUser(data);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

export async function getAllUser(req, res, next) {
  try {
    const result = await userService.getAllUser();
    res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

export async function getUserDetail(req, res, next) {
  try {
    const {username} = req.query ? req.query : false;
    const user = await userService.getUserDetail(username);
    res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserDetail(req, res, next) {
  try {
    const data = req.body;
    const user = await userService.updateUser(data);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const data = req.query;
    const user = await userService.deleteUser(data);
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

export async function addCredit(req, res, next) {
  try {
    const data = req.body;
    const result = await userService.processCreditToUser(data);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}
