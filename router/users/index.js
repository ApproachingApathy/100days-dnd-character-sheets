const express = require("express");
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

module.exports = router;
