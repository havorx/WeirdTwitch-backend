import express from 'express';
import * as authService from '../services/authService.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/refreshToken', authController.refreshToken);

router.post('/signup', authController.signupUser);

router.post('/login', authService.login, authController.loginUser);

router.post('/logout', authService.verifyUser, authController.logoutUser);

/*router.get('/account-detail', authService.verifyUser, (req, res, next) => {
  res.send(req);
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});*/

export default router;
