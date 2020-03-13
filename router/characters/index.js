const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("character page");
});

router.post("/new", (req, res) => {});

module.exports = router;
