const mongoose = require("mongoose");

global.logger = require("../helpers/create-logger")();

mongoose.model("Race", require("./models/race"));
mongoose.model("Class", require("./models/class"));

mongoose
	.connect("mongodb://localhost/dnd-sheets", {
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
