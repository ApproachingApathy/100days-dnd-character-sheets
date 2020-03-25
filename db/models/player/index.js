const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const Player= new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		index: { unique: true} 
	},
	password: {
		type: String,
		required: true,
	}
});

Player.methods.checkPassword = function(plainTextPassword) {
	return bcrypt.compare(plainTextPassword, this.password)
}

Player.statics.hashPassword = function(plainTextPassword) {
	return bcrypt.hash(plainTextPassword, 10)
}

module.exports = Player