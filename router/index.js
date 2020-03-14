const express = require("express");
const router = express.Router();

const siteConfig = require("../configs/site.json");

router.use((req, res, next) => {
	logger.debug(`Route: ${req.url}`);
	next();
});

router.use((req, res, next) => {
	res.locals.site = siteConfig;
	next();
});

router.get("/", (req, res) => {
	res.render("index", {
		page: {
			title: "Home"
		}
	});
});

app.use("/characters", require("./characters"));

// 404 Error
router.get("*", (req, res) => {
	res.statusCode = 404;
	res.render("404", {
		route: req.url,
		page: {
			title: "404"
		}
	});
});

module.exports = router;
