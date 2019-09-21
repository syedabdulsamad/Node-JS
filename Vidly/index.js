const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());

var port = process.env.port || 8000
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

var genersList = [
    {id: 1, name: "Art"},
    {id: 2, name: "Alternate"},
    {id: 3, name: "History"},
    {id: 4, name: "Autobiography"},
    {id: 5, name: "Anthology"},
	{id: 6, name: "Biography"},
    {id: 7, name: "Comic"},
    {id: 8, name: "Crime"},
    {id: 9, name: "Encyclopedia"},
    {id: 10, name: "Drama"},
	{id: 11, name: "Guide"},
    {id: 12, name: "Fairytale"},
	{id: 13, name: "Health"},
    {id: 14, name: "Fantasy"},
    {id: 15, name: "History"}
];

app.get("/geners",(request, response) => {
    response.send(genersList);
});

app.post("/geners",(request, response) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(40).required()
    });

    const result = joi.validate(request.body, schema);
    if(result.error) {
        response.status(400).send(result.error.details[0].message);
    } else {
        const newGenere = {
            id: genersList.length + 1,
            name: request.body.name
        };
        genersList.push(newGenere);
        response.send(newGenere);
    }
});

app.put("/geners/:id", (request, response) => {
    const result = validateName(request);
    if(result.error) {
        response.status(400).send(result.error.details[0].message);
    } else {
        const id = request.params.id;
        const foundGenere = genersList.find( genere => genere.id === parseInt(id));
        if(!foundGenere) {
            response.status(400).send(`No genere found with id: ${id}`);
        } else {
            foundGenere.name = request.body.name
            response.send(foundGenere);
        }
    }
});

app.delete("/geners/:id", (request, response) => {

    genersList = genersList.filter(genere => genere.id !== parseInt(request.params.id));
    response.status(200).send(genersList);
});

function validateName(request) {

    const schema = joi.object().keys({
        name: joi.string().min(3).max(40).required()
    });

    const result = joi.validate(request.body, schema);
    return result;
}

function getGenere() {
    return genersList;
}