import winston from "winston"

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  trace: 6
}

const logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || "info",
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
})

export default logger
