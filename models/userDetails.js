import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserDetailSchema = new Schema(
	{
		name: { type: String, required: true, minLength: 3, maxLength: 20 },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ collection: 'user_details' },
);

export default mongoose.model('UserDetail', UserDetailSchema);
