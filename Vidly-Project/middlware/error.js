const winston = require("winston");

module.exports = function(error ,req, res, next) {
    console.log("--------------------------   " + error.message + "-----------------------------------");
    winston.warn(error.message);
    winston.error(error.message, error);
    res.status(500).send(error.message);
};