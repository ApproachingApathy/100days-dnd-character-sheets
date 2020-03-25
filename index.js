const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const sass = require("node-sass-middleware");
const session = require("express-session");
const passport = require("passport");

const dbPromise = require("./db");
require("./helpers/init-passport")();

const app = express();

// Move the config object to the global scope.
global.appConfig = require("./configs/config.json");

// Create a logger object and attach it to the global scope.
global.logger = require("./helpers/create-logger")();

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(
	sass({
		src: "sass/",
		dest: "public/css/",
		debug: true,
		prefix: "/css"
	})
);

app.use(express.static("public"));
app.use(
	session({
		secret: appConfig.SESSION_SECRET,
		resave: true,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(async (req, res, next) => {
	const db = await dbPromise;
	req.context = { db };
	next();
});
app.use(require("./router"));

const server = app.listen(
	appConfig.PORT || 3000,
	appConfig.HOSTNAME || "127.0.0.1",
	() => {
		const hostname = server.address().address;
		const port = server.address().port;
		logger.info(`Server listening at http://${hostname}:${port}/`);
	}
);
