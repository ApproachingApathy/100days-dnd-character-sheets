const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports;
function buildModels() {
	const models = {};
	// Read models directory
	const directories = fs.readdirSync(path.resolve("db/models"));

	directories.forEach(dir => {
		// Capitalize the modelName.
		const modelName = dir.charAt(0).toUpperCase() + dir.substring(1);

		models[modelName] = mongoose.model(
			modelName,
			require(path.resolve("db/models", dir))
		);
	});

	return models;
}

let connect = new Promise((resolve, reject) => {
	mongoose.connect("mongodb://localhost/dnd-sheets", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const db = mongoose.connection;
	db.on("error", () => {
		logger.error("Couldn't connect to mongodb");
		reject("Failed to connect to mongodb.");
	});

	db.once("open", () => {
		let connectTime = new Date();
		logger.info(
			`Connected to mongodb at ${connectTime.toLocaleDateString()} ${connectTime.toLocaleTimeString()}`
		);
		let models = buildModels();

		/**
		 * Close connection to mongo db.
		 */
		let close = () =>
			db.close(() => {
				let dcTime = new Date();
				logger.info(
					`Disconnected from mongodb at ${dcTime.toLocaleDateString()} ${dcTime.toLocaleTimeString()}.`
				);
			});
		resolve({
			mongoose,
			models,
			close
		});
	});
});

/**
 * Return models and a db models.
 */
module.exports = (async () => {
	return await connect;
})();
