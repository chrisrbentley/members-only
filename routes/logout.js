import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/log-out', authController.onLogOut);

export default router;
