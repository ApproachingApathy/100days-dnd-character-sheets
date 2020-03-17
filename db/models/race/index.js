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
		},
		speed: Number,
		size: {
			type: String,
			enum: ["tiny", "small", "medium", "large", "huge", "gargantuan"]
		}
	},
	age: {
		lifespan: Number,
		maturity: Number
	},
	alignments: {
		type: [String],
		enum: [
			"lawful good",
			"neutral good",
			"chaotic good",
			"lawful neutral",
			"true neutral",
			"chaotic neutral",
			"lawful evil",
			"neutral evil",
			"chaotic evil"
		]
	},
	languages: [String],
	parentRace: {
		type: [mongoose.Types.ObjectId, null]
	}
});
