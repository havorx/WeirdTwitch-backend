import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/add-category', async (req, res, next) => {
  const user = await User.findById(res.locals.currentUser._id);
  user.category.push(req.body._id);
  await user.save(error => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/get-detail', (async (req, res, next) => {
  const user = await User.findById(res.locals.currentUser._id).
      populate('category');
  if (!user) {
    res.status(400).send({
      'message': 'room not existed',
    });
  } else res.json(user);

}));

export default router;
