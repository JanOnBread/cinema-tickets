import winston from "winston";

const logger = winston.createLogger({
  level: "debug", // Set the log level to debug (you can change it)
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize logs
        winston.format.simple(), // Simple log format
      ),
    }),
  ],
});
export default logger;
