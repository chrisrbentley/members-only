import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 20 },
	password: { type: String, required: true, minLength: 4, maxLength: 20 },
	member: { type: Boolean, required: true },
});

export default mongoose.model('User', UserSchema);
