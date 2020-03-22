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
		const warlock = await db.models.Class.findOne({name: "Warlock"})
		const player = await db.models.Player.create({
			username: "admin",
			email: "ephriamhenderson@ephriamhenderson.dev",
			password: 'password'
		})

		await db.models.Character.create({
			shortName: "Aria",
			longName: "Aria Wyndsong",
			race: elf.id,
			class: warlock.id,
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
				}
			}
		})
		return db;
	})
	.then(db => {
		db.disconnect();
	});
