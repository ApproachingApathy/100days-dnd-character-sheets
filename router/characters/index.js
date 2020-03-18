const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("character page");
});

router.get("/:id", async (req, res) => {
	const character = await req.context.db.models.Character.findOne({
		_id: req.params.id
	});
	if (character == null) {
		res.redirect("/404");
		return false;
	}

	const player = await req.context.db.models.Player.findOne({
		_id: character.player
	});

	res.render("characterSheet", {
		data: {
			character,
			player
		}
	});
});

router.post("/new", bodyParser.urlencoded(), (req, res) => {});

module.exports = router;
