const winston = require('winston');

const logFormat = winston.format.printf(({ timestamp, level, functionName, message, stack, body }) => {
  const errorLogObj = {
    timestamp,
    level,
    functionName,
    message,
    stack,
    body
  };

  // Return the log as a JSON string
  return JSON.stringify(errorLogObj, null, 2);
});

const logger = winston.createLogger({
  level: 'info', // Set default log level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      ),
    }),
    new winston.transports.File({ filename: 'logs/app.log' }), // Logs to file
  ],
});

module.exports = logger;
