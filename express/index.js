const express = require("express");
const joi = require("joi");
const responseTime = require('response-time')
const app = express();
const config = require("config");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

console.log(`Application name : ${config.get("name")}`);
console.log(`Application main author : ${config.get("creator.main_author")}`);
console.log(`Application main author name : ${config.get("creator.main_author_name")}`);

if(app.get("env") ===  "development") {
    app.use(responseTime({digits:5, header: "time-taken", suffix: true}));
}

const port = process.env.PORT || 3000

const courses = [  
    {id:1   , name: "course1"},
    {id:2   , name: "course2"},
    {id:3   , name: "course3"},
    {id:4   , name: "course4"},
    {id:5   , name: "course5"},
    {id:6   , name: "course6"}
];

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (request, response) => {
    response.send("Hello World!");

});

app.get("/api/courses/", (request, response) => {
    response.send(getCourses());
});

app.get('/api/courses/:id', (request, response) => {
    
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) {
        response.status(404).send(`The course with id: ${request.params.id} is not found.`);
    } else {
        response.send(course)
    }
});

app.post("/api/courses", (request, response) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(20).required()
    })
    const result = joi.validate(request.body, schema)
    if(result.error) {
        response.status(400).send(result.error.details[0].message);
        return;
    }
    const newCourse = {
        id : getCourses().length + 1,
        name : request.body.name
    };
    addCourse(newCourse);
    console.log(`New ${request.body.name} course is created`);
    response.send(newCourse);
});

function addCourse(course) {
    courses.push(course);
}

function getCourses() {
    return courses;
}