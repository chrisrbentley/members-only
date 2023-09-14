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
			timestamp: new Date().toLocaleDateString(),
			text: req.body.message,
		});
		await newMessage.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

export const getMessages = async (req, res, next) => {
	let messages = [];
	if (req.user) {
		// logged in
		messages = await Message.find({})
			.sort({ timestamp: -1 })
			.populate('author')
			.exec();
		res.render('index.pug', {
			messages: messages,
		});
	} else {
		// not logged in
		messages = await Message.find({}, { title: 1, text: 1 }).exec();
		console.log(messages);
		res.render('index.pug', {
			messages: messages,
		});
	}
};
