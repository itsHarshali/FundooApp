var winston = require('winston');

var options = {
  file: {
    level: 'info',
    // name: 'file.info',
    filename: `.logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: false,
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


// your centralized logger object
let logger = winston.createLogger({
  //levels: winston.config.npm.levels
  transports: [
  new winston.transports.Console(),
  new winston.transports.File({filename:'.log'})
  
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports= logger