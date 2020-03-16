const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
	name: String,
	stats: {
		abilityMods: {
			strength: Number,
			dexterity: Number,
			constitution: Number,
			intelligence: Number,
			wisdom: Number,
			charisma: Number
		}
	}
});
