import * as authService from '../services/authService.js';

export async function refreshToken(req, res, next) {
  try {
    const data = req.body;
    const result = await authService.refreshToken(data);
    return res.status(result.status).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function signupUser(req, res, next) {
  try {
    const data = req.body;
    const result = await authService.signupUser(data);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const data = req.user;
    const result = await authService.loginUser(data);
    if (result.status !== 200) {
      return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function logoutUser(req, res, next) {
  try {
    const result = await authService.logoutUser(req.body);
    return res.status(200).send(result.message);
  } catch (err) {
    res.status(500).send(err);
  }
}
