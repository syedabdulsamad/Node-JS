const allLogs = require("debug")("app:all-logs");
const dblogs = require("debug")("app:db-logs");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const pug = require("pug");
const Joi = require("joi");
const router = require("./courses");
const homepageRouter = require("./Routes/homepage");

const express = require('express');
const logger = require("./logger");

const app = express();
app.use(express.json());
app.use("/api/courses", router);
app.use("/", homepageRouter);
app.use(logger);

app.use(function (req, res, myFunction) {
    console.log("Logging this middleware function");
    myFunction();
})

allLogs("App logs");
dblogs("db logs");


if(app.get("env") === "development") {
    app.use(morgan('combined'));
}

app.set("view engine", "pug");
app.set("views", "./views");

console.log(`App name is : ${config.get("name")}`);
console.log(`Mail server is : ${config.get("mail").get("host")}`);

console.log(`Mail server is : ${config.get("mail.password")}`);

console.log(`Environment is : ${process.env.NODE_ENV}`);
console.log(`Environment is : ${app.get("env")}`);

const port = process.env.LISTENING_PORT || 2000

app.listen(port, () => console.log(`Listening on port: ${port}`));