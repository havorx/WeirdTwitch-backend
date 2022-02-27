import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.patch('/add-category', async (req, res, next) => {
  const user = await User.findOne({username: req.body.username});
  user.category = req.body.data;
  await user.save(error => {
    if (error) {
      next(error);
    } else {
      res.status(200).send(user);
    }
  });
});

router.get('/all-user', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('category');
    if (!users) {
      return res.status(404).send({
        'message': 'not found',
      });
    } else res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.get('/user-detail', (async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query);
      const {username} = req.query;
      const user = await User.findOne({username: username}).
          populate('category');
      if (!user) {
        res.status(404).send({
          'message': 'user not existed',
        });
      } else res.status(200).send(user);
    }
  } catch (err) {
    next(err);
  }
}));

router.patch('/edit-user', (async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userID);
    if (!user) {
      res.sendStatus(400);
    } else {
      user.status = req.body.status ?? user.status;
      user.role = req.body.role ?? user.role;
      user.save(err => {
        if (err) {
          next(err);
        }
      });
      res.status(200).send(user);
    }
  } catch (err) {
    next(err);
  }
}));

router.delete('/delete-user', (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      User.findByIdAndDelete(req.query.ID, (err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

router.patch('/add-credit', (async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userID);
    if (!user) {
      res.sendStatus(400);
    } else {
      user.credits = user.credits + req.body.credits;
      user.save(err => {
        if (err) {
          next(err);
        }
      });
      res.status(200).send(user);
    }
  } catch (err) {
    next(err);
  }
}));

export default router;
