const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbPromise = require("../db");

module.exports = function initPassport() {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password"
			},
			async (email, password, done) => {
				logger.debug(`Auth attempt for: ${email}`);
				const db = await dbPromise;
				const player = await db.models.Player.findOne({
					email: email.toLowerCase()
				});
				if (!player) {
					logger.debug(`No email found for: ${email}`);
					return done(null, false, { message: "Incorrect Credentials" });
				}

				let isMatch = await player.checkPassword(password);

				if (!isMatch) {
					logger.debug(`Incorrect password for: ${email}`);
					return done(null, false, { message: "Incorrect Credentials" });
				}
				logger.debug(`${email} logged in successfully.`);

				return done(null, player);
			}
		)
	);

	passport.serializeUser((user, done) => {
		logger.debug(`Serializing ${user.email}`);
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		logger.debug(`Deserializing user: ${id}`);
		const db = await dbPromise;
		let user = await db.models.Player.findById(id);
		done(null, user);
	});
};
