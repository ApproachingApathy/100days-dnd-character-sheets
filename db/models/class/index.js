const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Die = require("../../sharedSchemas/die");

const Choice = new Schema({
	selectableAmount: Number,
	options: [String]
});

module.exports = new Schema({
	name: String,
	stats: {
		hitPoints: {
			hitDice: {
				die: Die
			},
			initial: Number,
			levelUp: {
				die: Die,
				alternative: Number
			}
		},
		proficiencies: {
			armor: [String],
			weapons: [String],
			tools: [String],
			savingThrows: {
				type: [String],
				enum: [
					"strength",
					"dexterity",
					"constitution",
					"intelligence",
					"wisdom",
					"charisma"
				]
			},
			skills: [Choice]
		}
	}
});
