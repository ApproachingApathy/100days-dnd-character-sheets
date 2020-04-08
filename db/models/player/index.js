const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
// From https://emailregex.com/
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Player = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		index: { unique: true },
		lowercase: true,
		match: emailPattern
	},
	password: {
		type: String,
		required: true,
		get: () => {
			let accessError = new Error(
				"Password field is not directly accessible. Please use the checkPassword or hashPassword method."
			);
			logger.error(accessError.message);
			throw accessError;
		}
	},
	createdAt: {
		type: Schema.Types.Date,
		required: true,
		default: new Date()
	},
	updatedAt: {
		type: Schema.Types.Date,
		required: true,
		default: new Date()
	}
});

Player.pre("save", function (next, docs) {
	this.updatedAt = new Date();
	next();
});

Player.methods.checkPassword = function (plainTextPassword) {
	return bcrypt.compare(plainTextPassword, this.password);
};

Player.statics.hashPassword = function (plainTextPassword) {
	return bcrypt.hash(plainTextPassword, 10);
};

module.exports = Player;
