const express = require("express");
const validateObjectIds = require("../middlware/validateObjectIds");
const asyncMiddleware = require("../middlware/async");
const auth = require("../middlware/auth");
const Joi = require("joi");
const admin = require("../middlware/admin");
const {Genere, GenereSchema} = require("../models/genere");
const mongoose =  require("mongoose")
const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    const geners = await Genere.find();        
    res.send(geners);
}));

router.get("/:id", validateObjectIds, async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
       return res.status(404).send(`Genere not found with id ${req.body.id}`)
    }
    const genere = await Genere.findById({_id: req.params.id});
    (genere == null) ? res.status(404).send(`Genere not found with id ${req.body.id}`) : res.send(genere)
});

 router.post("/", auth, async (req, res) => {
    const schema = {
        name: Joi.string().min(4).max(25).required()
    };

    const {error} = Joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const genere = new Genere({
        name: req.body.name
    });
    const createdObj = await genere.save();
    res.status(201).send(createdObj);
})

router.put("/:id", auth, async (req, res) => {

    const schema = {
        name: Joi.string().min(4).max(25).required()
    };
    const {error} = Joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const updatedGenere = await Genere.findByIdAndUpdate({_id: req.params.id},  {name: req.body.name}, (error, result) => {
        if(error) {
            res.status(404).send(error.message);  
        } else {
            res.send(result);     
        }
    });
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const deletedGenere = await Genere.findByIdAndRemove(req.params.id, (error, result) => {
        if(error) {
            res.status(404).send(error.message);  
        } else {
            res.send(result);   
        }
    });
});

module.exports = router;