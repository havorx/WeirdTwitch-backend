import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

router.get('/get-category', async (req, res, next) => {
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

export default router;
