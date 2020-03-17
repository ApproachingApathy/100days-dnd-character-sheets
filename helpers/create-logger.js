const winston = require("winston");

module.exports = function createLogger() {
	return winston.createLogger({
		level:
			typeof appConfig != "undefined"
				? appConfig.LOGGER_LEVEL || "debug"
				: "debug",
		transports: [
			new winston.transports.Console({
				level: "debug",
				format: winston.format.cli()
			}),
			new winston.transports.File({
				filename: "logs/info.log",
				level: "info",
				format: winston.format.json()
			}),
			new winston.transports.File({
				filename: "logs/error.log",
				level: "error",
				format: winston.format.json()
			})
		]
	});
};
