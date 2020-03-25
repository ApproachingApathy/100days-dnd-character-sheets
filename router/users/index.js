const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const assert = require("assert");

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

router.get("/signup", (req, res) => {
	res.send("signup page");
});

router.post(
	"/signup",
	bodyParser.urlencoded({ extended: true }),
	async (req, res) => {
		const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		try {
			assert(req.body, "Bad Request");
			assert(
				typeof req.body.password == "string" &&
					req.body.password.length > 0,
				"Bad Request: No Password"
			);
			assert(
				typeof req.body.email == "string" && req.body.email.length > 0,
				"Bad Request: No Email"
			);
			assert(
				typeof req.body.username == "string" &&
					req.body.username.length > 0,
				"Bad Request: No Username"
			);
			assert(
				emailPattern.test(req.body.email),
				"Bad Request: Email Incorrectly Formatted"
			);
		} catch (err) {
			res.status(400);
			res.json({ error: err.toString() });
			return false;
		}

		req.context.db.models.Player.create({
			username: req.body.username,
			email: req.body.email,
			password: await req.context.db.models.Player.hashPassword(
				req.body.password
			)
		})
			.then(() => {
				res.redirect("/");
			})
			.catch(() => {
				res.redirect("/users/signup");
			});
	}
);

module.exports = router;
