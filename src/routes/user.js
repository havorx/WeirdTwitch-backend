import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import {
  cookieOptions,
  getRefreshToken,
  getToken, verifyUser,
} from '../auth/authenticate.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('./refreshToken', ((req, res, next) => {
  const {signedCookies = {}} = req;
  const {refreshToken} = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken,
          process.env.REFRESH_TOKEN_SECRET);
      const userId = payload._id;
      User.findOne({_id: userId}).then(
          user => {
            if (user) {
              // Find the refresh token against the user record in database
              const tokenIndex = user.refreshToken.findIndex(
                  item => item.refreshToken === refreshToken,
              );

              if (tokenIndex === -1) {
                res.statusCode = 401;
                res.send('Unauthorized');
              } else {
                const token = getToken({_id: userId});

                // If the refresh token exists, then create new one and replace it.
                const newRefreshToken = getRefreshToken({_id: userId});
                user.refreshToken[tokenIndex] = {refreshToken: newRefreshToken};
                user.save((err, user) => {
                  if (err) {
                    res.statusCode = 500;
                    res.send(err);
                  } else {
                    res.cookie('refreshToken', newRefreshToken, cookieOptions);
                    res.send({success: true, token});
                  }
                });
              }
            } else {
              res.status(401).send('Unauthorized');
            }
          },
          err => next(err),
      );
    } catch (err) {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}));

router.post('/signup', async (req, res, next) => {
  try {
    await User.register(
        new User({username: req.body.username}),
        req.body.password, async (err, user) => {
          if (!err) {
            const token = getToken({_id: user._id});
            const refreshToken = getRefreshToken({_id: user._id});
            user.refreshToken.push({refreshToken});

            await user.save(err => {
              if (!err) {
                res.cookie('refreshToken', refreshToken, cookieOptions);
                res.status(200).send({token});
              }
            });
          }
        });
  } catch (err) {
    return next(err);
  }

});

router.post('/login', passport.authenticate('local'), async (
    req, res, next) => {
  const token = getToken({_id: req.user._id});
  const refreshToken = getRefreshToken({_id: req.user._id});
  await User.findById(req.user._id).then(
      async user => {
        user.refreshToken.push({refreshToken});
        try {
          await user.save(err => {
            if (!err) {
              res.cookie('refreshToken', refreshToken, cookieOptions);
              res.status(200).send({token});
            }
          });
        } catch (err) {
          return next(err);
        }
      },
      err => next(err),
  );
});

router.get('/logout', verifyUser, (req, res, next) => {
  const {signedCookies = {}} = req;
  const {refreshToken} = signedCookies;
  User.findById(req.user._id).then(
      async user => {
        const tokenIndex = user.refreshToken.findIndex(
            item => item.refreshToken === refreshToken,
        );

        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.clearCookie('refreshToken', cookieOptions);
            res.send({success: true});
          }
        });
      },
      err => next(err),
  );
});

router.get('/account-detail', verifyUser, (req, res, next) => {

  res.send(req);
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

export default router;
