import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.patch('/add-category', userController.addCategoryToUser);

router.get('/all-user', userController.getAllUser);

router.get('/user-detail/:username', userController.getUserDetail);

router.patch('/edit-user', userController.updateUserDetail);

router.delete('/delete-user', userController.deleteUser);

router.patch('/add-credit', userController.addCredit);

export default router;
