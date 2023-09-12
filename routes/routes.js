import express from 'express';
import * as messageController from '../controllers/messageController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// index
router.get('/', (req, res) => {
	res.render('index.pug');
});

// messages
router.get('/new-message', messageController.getMessageForm);
router.post('/new-message', messageController.postMessage);

// sign in
router.get('/sign-in', authController.signInPost);
router.post('/sign-in', authController.onSignIn);

// signup
router.get('/sign-up', (_req, res) => {
	res.render('signUp.pug');
});
router.post('/sign-up', authController.onSignUp);

// logout
router.get('/log-out', authController.onLogOut);

export default router;
