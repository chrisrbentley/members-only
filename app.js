import 'dotenv/config.js';
import createError from 'https';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import localStrategy from 'passport-local';
import User from './models/user.js';
import bcrypt from 'bcryptjs';

import indexRouter from './routes/index.js';
import signUpRouter from './routes/signUp.js';
import signInRouter from './routes/signIn.js';
import logoutRouter from './routes/logout.js';

const app = express();
const LocalStrategy = localStrategy.Strategy;

mongoose.set('strictQuery', false);

const mongoDBData = process.env.MONGODB_URI;

const main = async () => {
	try {
		await mongoose.connect(mongoDBData);
	} catch (err) {
		console.log(`Could not fetch data, ${err}`);
	}
};
main();

app.set('view engine', 'pug');

app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use('/', indexRouter);
app.use('/', signUpRouter);
app.use('/', signInRouter);
app.use('/', logoutRouter);

app.use(express.static('public'));

app.use((req, res, next) => {
	next(createError(404));
});

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: 'Incorrect password' });
			}

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(3000, () => {
	console.log('App listening on port 3000');
});

export default app;
