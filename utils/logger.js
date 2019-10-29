const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.File({
      filename: './logs/app.log',
      level: 'info',
      format: winston.format.json(),
    }),
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger
