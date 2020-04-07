const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
	amount: Number,
	dice: {
		type: String,
		enum: ["d4", "d6", "d8", "d10", "d12", "d20"]
	}
});
