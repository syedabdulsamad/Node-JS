const Joi = require("@hapi/joi");
require("winston-mongodb");
const winston = require("winston");

module.exports = function() {
    winston.add(winston.transports.File, {filename: "logfile.log"}); 
    winston.add(winston.transports.MongoDB, {db: "mongodb://localhost/vidly", level: "error"});
    process.on("unhandledRejection", (ex) => {
        throw ex;
    });
    winston.handleExceptions(
        new winston.transports.File({filename: "uncaughtexceptions.log"}),
        new winston.transports.Console({colorize: true, prettyPrint: true})
    );
}