const mongoose = require("mongoose");

global.logger = require("../helpers/create-logger")();

// {
// 	name: String,
// 	stats: {
// 		abilityMods: {
// 			strength: Number,
// 			dexterity: Number,
// 			constitution: Number,
// 			intelligence: Number,
// 			wisdom: Number,
// 			charisma: Number
// 		},
// 		speed: Number,
// 		size: {
// 			type: String,
// 			enum: ["tiny", "small", "medium", "large", "huge", "gargantuan"]
// 		}
// 	},
// 	age: {
// 		lifespan: Number,
// 		maturity: Number
// 	},
// 	alignments: {
// 		type: [String],
// 		enum: [
// 			"lawful good",
// 			"neutral good",
// 			"chaotic good",
// 			"lawful neutral",
// 			"true neutral",
// 			"chaotic neutral",
// 			"lawful evil",
// 			"neutral evil",
// 			"chaotic evil"
// 		]
// 	},
// 	languages: [String],
// 	parentRace: mongoose.Types.ObjectId
// }

mongoose
	.connect("mongodb://localhost/dnd-sheets", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(db => {
		// console.log(db);
		db.models.Race.create([
			{
				name: "Dwarf",
				stats: {
					abilityMods: {
						strength: 0,
						dexterity: 0,
						constitution: 0,
						intelligence: 0,
						wisdom: 0,
						charisma: 0
					},
					speed: 25,
					size: "medium"
				},
				age: {
					lifespan: 350,
					maturity: 50
				},
				alignments: ["lawful good", "lawful neutral", "neutral good"],
				languages: ["common", "dwarvish"],
				parentRace: null
			}
		]);
	});
