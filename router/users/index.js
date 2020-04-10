const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const assert = require("assert");

const router = express.Router();

router.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	} else {
		res.render("users/login", {
			page: {
				title: "Login-Signup"
			}
		});
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

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get("/signup", (req, res) => {
	res.redirect("/users/login");
});

router.post(
	"/signup",
	bodyParser.urlencoded({ extended: true }),
	async (req, res) => {
		const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordPattern = /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50}).*)$/u;
		try {
			assert(req.body, "Bad Request");
			assert(
				typeof req.body.password == "string" &&
					req.body.password.length > 0,
				"No Password"
			);
			assert(
				typeof req.body.email == "string" && req.body.email.length > 0,
				"No Email"
			);
			assert(
				typeof req.body.username == "string" &&
					req.body.username.length > 0,
				"No Username"
			);
			assert(
				emailPattern.test(req.body.email),
				"Email Incorrectly Formatted"
			);
			assert(
				passwordPattern.test(req.body.password),
				"Password does not meet requirements. \n 8-50 Characters, 1 lowercase, uppercase, and number."
			);
			assert(
				(await req.context.db.models.Player.findOne({
					email: req.body.email
				})) == null,
				"User with that email already exists"
			),
				assert(
					(await req.context.db.models.Player.findOne({
						username: req.body.username
					})) == null,
					"Username taken"
				);
		} catch (err) {
			res.status(400);
			req.flash({ type: "ERROR", message: err.message });
			res.redirect("/users/login");
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
				logger.debug("User Created");
				req.flash({
					type: "SUCCESS",
					message: "Signup successful! You can now login."
				});
				res.redirect("/");
			})
			.catch((err) => {
				logger.error(err.message);
				res.status(500);
				req.flash({
					type: "ERROR",
					message: "An error occurred please try again later."
				});
				res.redirect("/users/login");
			});
	}
);

router.get("/characters", async (req, res) => {
	if (req.isAuthenticated()) {
		const characters = await req.context.db.models.Character.find({
			player: req.user.id
		}).populate("player");
		console.log(characters);
		res.render("characters/characterList", {
			page: {
				title: "Your Characters"
			},
			data: {
				characters
			}
		});
	} else {
		res.redirect("/users/login");
	}
});

module.exports = router;
