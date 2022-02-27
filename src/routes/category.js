import express from 'express';
import Category from '../models/Category.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/get-category', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query);
      const {categoryName} = req.query;
      const category = await Category.findOne({categoryName: categoryName});
      if (!category) {
        return res.status(400).send({
          'message': 'category not found',
        });
      } else res.status(200).send(category);
    } else {
      const categories = await Category.find();
      if (!categories) {
        return res.status(400).send({
          'message': 'not found',
        });
      } else res.status(200).send(categories);
    }
  } catch (err) {
    return next(err);
  }
});

router.patch('/edit-category', async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.categoryID);
    if (!category) {
      res.sendStatus(400);
    } else {
      category.categoryName = req.body.categoryName;
      category.save(err => {
        if (err) {
          next(err);
        }
      });
      res.status(200).send(category);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/delete-category', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query.ID);
      Category.findByIdAndDelete(req.query.ID, (err) => {
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

export default router;
