const express = require("express");
const Joi = require("joi");

const router = express.Router();

const courses = [
    {id: 1, name: "Data structures"},
    {id: 2, name: "Algorithms"},
    {id: 3, name: "Graph theory"},
];

router.get("/", (req,res) => {
    res.send(courses);
})

router.get("/:id", (req, res ) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
         res.status(404).send("The couse with ID was not found");
    }
    res.send(course);
});

router.post("/", (req,res) => {
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

router.put("/:id", (req, res) => {

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


router.delete('/:id', (req, res) => {

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

module.exports = router;