const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skill = Schema({
	proficiency: Boolean,
	value: Number,
	additionalModifiers: [{ source: String, value: Number }]
});

module.exports = new Schema({
	shortName: String,
	longName: String,
	race: mongoose.ObjectId,
	class: mongoose.ObjectId,
	player: mongoose.ObjectId,
	description: String,
	age: Number,
	urlSlug: String,
	stats: {
		abilities: {
			strength: Number,
			dexterity: Number,
			constitution: Number,
			intelligence: Number,
			wisdom: Number,
			charisma: Number
		},
		skills: {
			acrobatics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: Skill
			},
			animalHandling: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: Skill
			},
			arcana: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: Skill
			},
			athletics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: Skill
			},
			deception: {
				ability: {
					type: String,
					default: "charisma"
				}
			},
			history: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: Skill
			},
			insight: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: Skill
			},
			intimidation: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: Skill
			},
			acrobatics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: Skill
			},
			investigation: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: Skill
			},
			medicine: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: Skill
			},
			perception: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: Skill
			},
			performance: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: Skill
			},
			persuasion: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: Skill
			},
			religion: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: Skill
			},
			sleightOfHand: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: Skill
			},
			stealth: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: Skill
			},
			survival: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: Skill
			}
		},
		speed: Number,
		proficiencyBonus: Number
	}
});
