const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Die = new Schema({
	amount: Number,
	dice: {
		type: String,
		enum: ["d4", "d6", "d8", "d10", "d12", "d20"]
	}
});

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
