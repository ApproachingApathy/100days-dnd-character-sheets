const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("character page");
});

router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	req.context.db.models.Character.findOne({ _id: req.params.id }).then(
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

router.get("/create-test", async (req, res) => {});

module.exports = router;
