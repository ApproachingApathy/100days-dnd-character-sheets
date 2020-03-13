const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
	shortName: String,
	longName: String,
	race: mongoose.ObjectId,
	class: mongoose.ObjectId,
	player: mongoose.ObjectId,
	Description: String,
	stats: {
		abilities: {
			strength: Number,
			dexterity: Number,
			constitution: Number,
			intelligence: Number,
			wisdom: Number,
			charisma: Number
		},
		speed: Number,
		proficiencyBonus: Number
	}
});
