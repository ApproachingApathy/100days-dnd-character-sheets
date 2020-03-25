const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/", (req, res) => {
	req.context.models.Player.find().then(players => {
		res.render("users", {
			data: {
				users: players || []
			}
		});
	});
});

router.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	} else {
		res.send("Login Page");
	}
});

router.post(
	"/login",
	bodyParser.urlencoded({ extended: true }),
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/users/login"
	})
);

module.exports = router;
