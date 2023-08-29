import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
	name: { type: String, required: true, minLength: 3, maxLength: 20 },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('UserDetail', UserDetailSchema);
