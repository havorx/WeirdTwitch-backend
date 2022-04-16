import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/get-category/:categoryName?', categoryController.getCategory);

router.post('/add-category', categoryController.addCategory);

router.patch('/update-category/:categoryID', categoryController.updateCategory);

router.delete('/delete-category/:categoryID', categoryController.deleteCategory);

export default router;
