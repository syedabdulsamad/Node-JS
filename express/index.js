const express = require("express");

const app = express();
app.use(express.json());
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
    const newCourse = {
        id : getCourses().length + 1,
        name : request.body.name
    };
    addCourse(newCourse);
    response.send(newCourse);
});

function addCourse(course) {
    courses.push(course);
}

function getCourses() {
    return courses;
}