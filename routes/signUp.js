import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/sign-up', (_req, res) => {
	res.render('signUp.pug');
});

router.post('/sign-up', authController.onSignUp);

export default router;
