const express = require("express");
const Joi = require("joi");
const router = express.Router();


const generes = [
    {id: 1, name: "Action"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Horror"},
    {id: 4, name: "Adventure"},
    {id: 5, name: "Suspense"},
];

router.get("/", (req, res) => {
    res.send(generes);
});

router.get("/:id", (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    return res.status((genere == null) ? 404 : 200)
    .send((genere == null) ? "Genere with the given id not found" : genere);
});

router.post("/", (req, res) => {
    const schema = {
        name: Joi.string().min(4).max(25).required()
    };

    const {error} = Joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    var genere = {
        id: generes.length + 1, 
        name: req.body.name
    };
    generes.push(genere);
    return res.status(201).send(genere);
})



router.put("/:id", (req, res) => {

    const schema = {
        name: Joi.string().min(4).max(25).required()
    };

    const {error} = Joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    var genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere) {
       return res.status(404).send("Genere with the given id not found");
    }
    genere.name = req.body.name
    res.status(200).send(genere);
});


router.delete("/:id", (req, res) => {

    var genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere) {
       return res.status(404).send("Genere with the given id not found");
    }
    const index = generes.indexOf(genere);
    generes.splice(index, 1);
    res.status(200).send(genere);
});

module.exports = router;