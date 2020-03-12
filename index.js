const express = require("express");
const app = express();

// Move the config object to the global scope.
global.appConfig = require("./configs/config.json");

// Create a logger object and attach it to the global scope.
global.logger = require("./helpers/create-logger")();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(require("./router"));

const server = app.listen(appConfig.PORT, appConfig.HOSTNAME, () => {
	const hostname = server.address().address;
	const port = server.address().port;
	logger.info(`Server listening at http://${hostname}:${port}/`);
});
