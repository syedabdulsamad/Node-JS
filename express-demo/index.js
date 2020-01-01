const config = require("config");
const Joi = require("joi");
const express = require('express');
const logger = require("./logger");

const app = express();
app.use(express.json());
app.use(logger);


app.use(function (req, res, myFunction) {
    console.log("Logging this middleware function");
    myFunction();
})

console.log(`App name is : ${config.get("name")}`);
console.log(`Mail server is : ${config.get("mail").get("host")}`);

console.log(`Mail server is : ${config.get("mail.password")}`);

console.log(`Environment is : ${process.env.NODE_ENV}`);
console.log(`Environment is : ${app.get("env")}`);

const courses = [
    {id: 1, name: "Data structures"},
    {id: 2, name: "Algorithms"},
    {id: 3, name: "Graph theory"},
];

app.get('/', (req,res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req,res) => {
    res.send(courses);

})

app.get("/api/courses/:id", (req, res ) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
         res.status(404).send("The couse with ID was not found");
    }
    res.send(course);
});

app.post("/api/courses", (req,res) => {

    const schema = {
        name: Joi.string().required().min(4).max(40)
    }

    const validationResult = Joi.validate(req.body, schema);
    if(validationResult.error) {
        res.status(404).send(validationResult.error.details[0].message);
        return;
    }
    const course = req.body
    course.id = courses.length + 1;
    courses.push(course);
    res.status(201).send("The new course is created");

});

app.put("/api/courses/:id", (req, res) => {

    const {error} = validateCourse(req.body);
    if(error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
         res.status(404).send("The couse with ID was not found");
    }
    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
         res.status(404).send("The couse with ID was not found");
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


function validateCourse(body)  {
    const schema = {
        name: Joi.string().min(3).max(40).required()
    }
    return Joi.validate(body, schema);
}

const port = process.env.LISTENING_PORT || 2000

app.listen(port, () => console.log(`Listening on port: ${port}`));