const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
mongoose.connect("mongodb://localhost/dnd-sheets", { useNewUrlParser: true });

const db = mongoose.connection;
const models = {};
fs.readdir(path.resolve("./models"), (err, directories) => {
	if (err) return false;
	directories.forEach(dir => {
		const modelName = dir.charAt(0).toUpperCase() + dir.substring(1);
		console.log(modelName);
		models[modelName] = mongoose.model(
			modelName,
			require(path.resolve("./models", dir))
		);
	});
	models.Character.find((err, character) => {
		console.log(character);
	});
});

fs.re;

db.on("error", () => {
	// logger.error("Couldn't connect to mongodb");
});
db.once("open", () => {
	// logger.info("Connected to mongodb.");
	db.close();
});
