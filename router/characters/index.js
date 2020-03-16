const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("character page");
});

router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	req.context.models.Character.findOne({ _id: req.params.id }).then(
		async result => {
			if (result == null) res.redirect("/404");
			console.log(result);
			res.render("characterSheet", {
				data: {
					character: result,
					player: await req.context.models.Player.findOne({
						_id: result.player
					})
				}
			});
		}
	);
});

router.post("/new", (req, res) => {});

router.get("/create-test", async (req, res) => {
	let race = await req.context.models.Race.create({
		name: "Test",
		stats: {
			abilityMods: {
				strength: 0,
				dexterity: 1,
				constitution: 0,
				intelligence: 1,
				wisdom: 0,
				charisma: 0
			},
			speed: 30,
			size: "medium"
		}
	});

	let player = await req.context.models.Player.findOne({
		email: "test@ephriamhenderson.dev"
	});

	let charClass = await req.context.models.Class.create({
		name: "test",
		stats: {
			abilityMods: {
				strength: 2,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0
			}
		}
	});

	let character = await req.context.models.Character.create({
		shortName: "Zii",
		longName: "Zii",
		race: race.id,
		class: charClass.id,
		player: player.id,
		Description: "Zii",
		urlSlug: "",
		stats: {
			abilities: {
				strength: 8,
				dexterity: 8,
				constitution: 8,
				intelligence: 8,
				wisdom: 8,
				charisma: 8
			},
			speed: 30,
			proficiencyBonus: 2
		}
	});
});

module.exports = router;
