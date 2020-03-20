const mongoose = require("mongoose");
const dbConfig = require('../configs/db.json')

global.logger = require("../helpers/create-logger")();

mongoose.model("Race", require("./models/race"));
mongoose.model("Class", require("./models/class"));
mongoose.model("Character", require("./models/character"))
mongoose.model("Player", require("./models/player"))

mongoose
	.connect(dbConfig.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(async db => {
		const seedData = require("./seedData.json");
		await db.models.Race.create(seedData.races);
		await db.models.Class.create(seedData.classes);

		const elf = await db.models.Race.findOne({name: "Elf"})
		const player = await db.models.Player.create({
			username: "admin",
			email: "ephriamhenderson@ephriamhenderson.dev",
			password: 'password'
		})
		await db.models.Character.create({
			shortName: "Aria",
			longName: "Aria Wyndsong",
			race: elf.id,
			"class": await db.models.Class.findOne({name: "Warlock"}).id,
			player: player.id,
			description: "Aria is awesome.",
			age: 72,
			urlSlug: "",
			stats: {
				abilities: {
					strength: 10,
					dexterity: 12,
					constitution: 10,
					intelligence: 13,
					wisdom: 14,
					charisma: 16,
				},
				skills: {
					acrobatics: {
						skill: {
							proficiency: false,
							value: 1,
							additionalModifiers: []
						}
					},
					animalHandling: {
						skill: {
							proficiency: false,
							value: 2,
							additionalModifiers: []
						}
					},
					arcana: {
						skill: {
							proficiency: true,
							value: 1,
							additionalModifiers: []
						}
					},
					athletics: {
						skill: {
							proficiency: false,
							value: 0,
							additionalModifiers: []
						}
					},
					deception: {
						skill: {
							proficiency: false,
							value: 3,
							additionalModifiers: []
						}
					},
					history: {
						skill: {
							proficiency: true,
							value: 1,
							additionalModifiers: []
						}
					},
					insight: {
						skill: {
							proficiency: true,
							value: 2,
							additionalModifiers: []
						}
					},
					intimidation: {
						skill: {
							proficiency: false,
							value: 3,
							additionalModifiers: []
						}
					},
					acrobatics: {
						skill: {
							proficiency: false,
							value: 1,
							additionalModifiers: []
						}
					},
					investigation: {
						skill: {
							proficiency: true,
							value: 1,
							additionalModifiers: []
						}
					},
					medicine: {
						skill: {
							proficiency: false,
							value: 2,
							additionalModifiers: []
						}
					},
					perception: {
						skill: {
							proficiency: true,
							value: 2,
							additionalModifiers: []
						}
					},
					persuasion: {
						skill: {
							proficiency: false,
							value: 3,
							additionalModifiers: []
						}
					},
					religion: {
						skill: {
							proficiency: false,
							value: 1,
							additionalModifiers: []
						}
					},
					sleightOfHand: {
						skill: {
							proficiency: false,
							value: 1,
							additionalModifiers: []
						}
					},
					stealth: {
						skill: {
							proficiency: false,
							value: 1,
							additionalModifiers: []
						}
					},
					survival: {
						skill: {
							proficiency: false,
							value: 2,
							additionalModifiers: []
						}
					}
				},
				speed: elf.stats.speed,
				proficiencyBonus: 2
			}
		})
		return db;
	})
	.then(db => {
		db.disconnect();
	});
