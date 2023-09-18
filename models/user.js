import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, minLength: 1, maxLength: 20 },
	password: { type: String, required: true, minLength: 4, maxLength: 80 },
});

export default mongoose.model('User', UserSchema);
