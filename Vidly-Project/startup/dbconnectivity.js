const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
    console.log("Process info is : " + process.env);
    const db = config.get("db");

    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => { winston.info(`Connected to vidly ${db} database`)});
}