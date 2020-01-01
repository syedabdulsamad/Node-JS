const generalLog = require("debug")("app:general")
const dbLog = require("debug")("app:db")
const express = require("express");
const joi = require("joi");
const responseTime = require('response-time')
const app = express();
const config = require("config");
const courses = require("./courses");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));


app.use("/api/courses", courses);

console.log(`Application name : ${config.get("name")}`);
console.log(`Application main author : ${config.get("creator.main_author")}`);
console.log(`Application main author name : ${config.get("creator.main_author_name")}`);

if(app.get("env") ===  "development") {
    app.use(responseTime({digits:5, header: "time-taken", suffix: true}));
}

generalLog("This is a general log");
dbLog("This is a DB log");

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (request, response) => {
    response.send("Hello World!");

});

