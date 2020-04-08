const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Die = require("../../sharedSchemas/die");

const Skill = Schema({
	proficiency: {
		type: Boolean,
		default: false
	},
	value: {
		type: Number,
		default: 0
	},
	additionalModifiers: {
		type: [{ source: String, value: Number }],
		default: []
	}
});

const Character = new Schema({
	shortName: {
		type: String,
		required: true,
		index: true
	},
	longName: {
		type: String,
		required: true,
		index: true
	},
	race: {
		type: mongoose.ObjectId,
		ref: "Race"
		// required: true
	},
	class: {
		type: mongoose.ObjectId,
		ref: "Class"
		// required: true
	},
	player: {
		type: mongoose.ObjectId,
		ref: "Player"
		// required: true
	},
	description: {
		type: String,
		required: true
	},
	age: Number,
	urlSlug: {
		type: String,
		default: "",
		index: true
	},
	stats: {
		abilities: {
			strength: {
				type: Number,
				default: 8
			},
			dexterity: {
				type: Number,
				default: 8
			},
			constitution: {
				type: Number,
				default: 8
			},
			intelligence: {
				type: Number,
				default: 8
			},
			wisdom: {
				type: Number,
				default: 8
			},
			charisma: {
				type: Number,
				default: 8
			}
		},
		skills: {
			acrobatics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			animalHandling: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			arcana: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			athletics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			deception: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			history: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			insight: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			intimidation: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			acrobatics: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			investigation: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			medicine: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			nature: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			perception: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			performance: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			persuasion: {
				ability: {
					type: String,
					default: "charisma"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			religion: {
				ability: {
					type: String,
					default: "intelligence"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			sleightOfHand: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			stealth: {
				ability: {
					type: String,
					default: "dexterity"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			},
			survival: {
				ability: {
					type: String,
					default: "wisdom"
				},
				skill: {
					type: Skill,
					default: Skill
				}
			}
		},
		speed: {
			type: Number,
			default: 0
		},
		proficiencyBonus: {
			type: Number,
			default: 2
		},
		armorClass: {
			type: Number,
			default: 0
		},
		initiative: {
			type: Number,
			default: 0
		},
		hitPoints: {
			maximum: {
				type: Number,
				default: 10
			},
			current: {
				type: Number,
				default: 10
			},
			temporary: {
				type: Number,
				default: 0
			},
			hitDice: {
				type: Die,
				default: {
					amount: 1,
					dice: "d6"
				},
				get: (hitDice) => {
					return `${hitDice.amount}${hitDice.dice}`;
				}
			}
		}
	},
	features: {
		type: [
			{
				name: {
					type: String,
					default: ""
				},
				description: {
					type: String,
					default: ""
				}
			}
		],
		default: []
	},
	createdAt: {
		type: Schema.Types.Date,
		required: true,
		default: new Date()
	},
	updatedAt: {
		type: Schema.Types.Date,
		required: true,
		default: new Date()
	}
});

Character.pre("save", function (next, docs) {
	// Loop through skills
	Object.keys(this.stats.skills).forEach((key) => {
		let skill = this.stats.skills[key];
		skill.skill.value = Math.floor(
			// Calculate modifier
			(this.stats.abilities[skill.ability] - 10) / 2
		);
	});

	let Race = this.model("Race");

	// Get the characters speed from their race.
	// This will likely be changed because the
	// character speed may change.
	Race.findOne({ _id: this.race })
		.then((characterRace) => {
			if (characterRace) {
				this.stats.speed = characterRace.stats.speed;
			}
		})
		.then(() => {
			next();
		});
});

Character.pre("save", function (next, docs) {
	this.updatedAt = new Date();
	next();
});

module.exports = Character;
