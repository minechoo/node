const mongoose = require('moongoose');

const userSchema = new mongoose.Schema(
	{
		displayName: String,
		uid: String,
		userName: Number,
	},
	{ collection: 'User' }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
