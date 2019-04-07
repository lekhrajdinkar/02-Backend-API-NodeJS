const app_root = require('app-root-path');
const winston = require('winston');
const config = require('config');
require('winston-mongodb');

//logging using winston
let options = {
    file: {
      level: config.get('log.app'),
      filename: `${app_root}/logs/tact-app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    console: {
      level: config.get('log.app'),
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const logger1 = new winston.Logger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  
//winston.add(winston.transports.File, {filename : config.get('log.app')});
//winston.add(winston.transports.MongoDB, {db : config.get('mongo-tact.express-store-uri')})


const logger2 = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: `${app_root}/logs/tact-app.log`, level : config.get('log.app')})
    ]
  });
  
 
module.exports = {
    logger1,
    logger2
};