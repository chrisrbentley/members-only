import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'UserDetail', required: true },
	title: { type: String, required: true },
	timestamp: { type: Date, required: true },
	text: { type: String, required: true },
});

export default mongoose.model('Message', MessageSchema);
