import express from 'express';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Room from '../models/Room.js';

const router = express.Router();

router.patch('/create-admin', async (req, res, next) => {
  try {
    User.findOneAndUpdate({username: req.body.username}, {role: req.body.role}, {new: true},
        (err, updated) => {
          res.json(updated);
        });
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

router.post('/add-category', async (req, res, next) => {
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
