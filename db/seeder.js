const mongoose = require("mongoose");
const dbConfig = require('../configs/db.json')

global.logger = require("../helpers/create-logger")();

mongoose.model("Race", require("./models/race"));
mongoose.model("Class", require("./models/class"));

mongoose
	.connect(dbConfig.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(async db => {
		const seedData = require("./seedData.json");
		await db.models.Race.create(seedData.races);
		await db.models.Class.create(seedData.classes);
		return db;
	})
	.then(db => {
		db.disconnect();
	});
