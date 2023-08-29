import 'dotenv/config.js';
import createError from 'https';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
const app = express();

import indexRouter from './routes/index.js';

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use((req, res, next) => {
	next(createError(404));
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
