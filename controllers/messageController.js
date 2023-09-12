import Message from '../models/messages.js';

export const getMessageForm = (req, res, next) => {
	if (!req.user) {
		res.redirect('/sign-in');
	} else {
		res.render('messageForm.pug');
	}
};

export const postMessage = async (req, res, _next) => {
	try {
		const newMessage = new Message({
			author: req.user,
			title: req.body.title,
			timestamp: Date.now(),
			text: req.body.message,
		});
		console.log(newMessage);
		await newMessage.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};
