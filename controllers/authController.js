import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
import userDetail from '../models/userDetails.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import passport from 'passport';

export const onSignUp = [
	body('name', 'Name must be between 3-20 characters.')
		.trim()
		.isLength({ min: 3, max: 20 })
		.escape(),
	body('username', 'Username is already taken.')
		.trim()
		.matches(/^[A-Za-z0-9_]+$/)
		.isLength({ min: 1, max: 20 })
		.withMessage('Username can only contain letters, numbers and underscores.')
		.custom(async (value) => {
			// search database for username value
			const usernameExists = await User.find({ username: value });
			if (usernameExists.length > 0) {
				return Promise.reject('Username is already taken');
			}
		}),

	body('password', 'Must be between 4-20 characters.')
		.trim()
		.isLength({ min: 4, max: 20 })
		.escape(),

	body('confirmPassword', 'Your passwords do not match.')
		.trim()
		.custom((value, { req }) => {
			return value === req.body.password;
		}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const formattedErrors = {};
			errors.array().forEach((error) => {
				formattedErrors[error.path] = { msg: error.msg };
			});

			res.render('signUp.pug', {
				errors: formattedErrors,
			});
		} else {
			// no errors, create accounts
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				if (err) {
					console.error(`Error hashing password: ${err}`);
					res.status(500).send('Internal Server Error');
				}

				const user = new User({
					username: req.body.username,
					password: hashedPassword,
					member: false,
				});
				await user.save();

				const userDetails = new userDetail({
					name: req.body.name,
					user: user._id,
				});
				await userDetails.save();
			});

			res.redirect('/');
		}
	}),
];

export const signInPost = (req, res, next) => {
	const messages = req.session.messages || [];
	let message = null;

	if (messages.length > 0) {
		message = messages[messages.length - 1];
	}

	req.session.messages = [];

	res.render('signIn.pug', {
		message: message,
	});
};

export const onSignIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/sign-in',
	failureMessage: true,
});

export const onLogOut = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect('/');
	});
};
