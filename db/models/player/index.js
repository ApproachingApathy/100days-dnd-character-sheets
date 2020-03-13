const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
	username: String,
	email: String,
	password: String
});
