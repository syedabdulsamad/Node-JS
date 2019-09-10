const express = require("express");

const app = express();

app.listen(3000, () => console.log("Listening on port 3000"));

app.get("/", (request, response) => {
    response.send("Hello World!");

});

app.get("/api/courses", (request, response) => {
    response.send(getCourses());   
});


function getCourses() {
    return ["ML", "Node-JS", "Spring boot"];
}