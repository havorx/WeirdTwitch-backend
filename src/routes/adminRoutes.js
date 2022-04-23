import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.patch('/create-admin/:username', adminController.updateRole);

export default router;
