const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("character page");
});

router.get("/writer", (req, res) => {
	res.render("characters/characterWriter");
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

	res.render("characters/characterSheet", {
		data: {
			character,
			player,
			races: await req.context.db.models.Race.find()
		}
	});
});

router.post("/new", bodyParser.json(), (req, res) => {
	if (!req.body || !req.body.data || !req.body.data.longName) {
		res.status(400);
		res.json({ error: "Bad Request" });
		return false;
	}
	let data = req.body.data;
	let abilityScoreDefault = 8;
	req.context.db.models.Character.create({
		shortName: data.shortName || data.longName,
		longName: data.longName,
		race: data.raceId || null,
		class: data.classId || null,
		player: req.user.id || null,
		description: data.description || "",
		age: data.age || "",
		urlSlug: data.urlSlug || "",
		stats: {
			abilities: {
				strength: data.stats.abilities.strength || abilityScoreDefault,
				dexterity: data.stats.abilities.dexterity || abilityScoreDefault,
				constitution:
					data.stats.abilities.constitution || abilityScoreDefault,
				intelligence:
					data.stats.abilities.intelligence || abilityScoreDefault,
				wisdom: data.stats.abilities.wisdom || abilityScoreDefault,
				charisma: data.stats.abilities.charisma || abilityScoreDefault
			}
		}
	}).then(result => res.json(result));
});

module.exports = router;
