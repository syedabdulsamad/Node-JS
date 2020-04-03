const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/config")();
require("./startup/dbconnectivity")();
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.port || 4000;
const server = app.listen(port, () => {winston.info(`Listening on port ${port}`)});
// exporting server object to be used in integration tests.
module.exports = server;