import express from 'express';
import Category from '../models/Category.js';
import User from '../models/User.js';
import {verifyUser} from '../auth/authenticate.js';

const router = express.Router();

router.get('/all-user', async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(400).send({
        'message': 'not found',
      });

    } else res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.get('/view-category', async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(400).send({
        'message': 'not found',
      });

    } else res.json(categories);
  } catch (err) {
    return next(err);
  }
});

router.post('/add-category', verifyUser, async (req, res, next) => {
  const category = new Category({
    categoryName: req.body.categoryName,
    description: req.body.description,
  });
  try {
    await category.save();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

export default router;
