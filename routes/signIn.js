import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/sign-in', (req, res) => {
	const messages = req.session.messages || [];
	let message = null;

	if (messages.length > 0) {
		message = messages[messages.length - 1];
	}

	req.session.messages = [];

	res.render('signIn.pug', {
		message: message,
	});
});

router.post('/sign-in', authController.onSignIn);

export default router;
