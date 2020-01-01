const express = require("express");
const router = express.Router();
const courses = [  
    {id:1   , name: "course1"},
    {id:2   , name: "course2"},
    {id:3   , name: "course3"},
    {id:4   , name: "course4"},
    {id:5   , name: "course5"},
    {id:6   , name: "course6"}
];


router.get("/", (request, response) => {
    response.send(getCourses());
});

router.get('/:id', (request, response) => {
    
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) {
        response.status(404).send(`The course with id: ${request.params.id} is not found.`);
    } else {
        response.send(course)
    }
});

router.post("/", (request, response) => {
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


module.exports = router;