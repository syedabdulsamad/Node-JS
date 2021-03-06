const Fawn = require("fawn");
const app = require("express");
const auth = require("../middlware/auth");
const mongoose = require("mongoose");
const router = app.Router();
const {Rental,validateRental} = require("../models/rental");
const {CustomerSchema, validateCustomer, Customer} = require("../models/customer");
const {MovieSchema, validateMovie, Movie} = require("../models/movie");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.post("/", auth, async (req, res) => { 
    if (validateRental(req.body).error) {
        return res.status(400).send("Input request is not correct");
    }

    const movie = await Movie.findById(req.body.movieId).select({_id: 1, title: 1, numberInStock: 1});
    const customer = await Customer.findById(req.body.customerId).select({_id: 1, name: 1, phone: 1, isGold: 1});

    if(movie == null || customer == null) {
        return res.status(404).send("Customer or movie not found");
    }

    if(movie.numberInStock <= 0) {
        return res.status(404).send("Movie not in stock");
    }
    const rental = new Rental({movie: movie,
        customer: customer
    });

    try {
        new Fawn.Task()
        .save("rental", rental)
        .update("movies", {_id: movie._id}, 
        {$inc: {numberInStock: -1} 
        })
        .run();
        // decrement this as the update happens after the rental object is already created.
        rental.movie.numberInStock -= 1;    
        res.send(rental);
    } catch(ex) {
        res.status(500).send("Something went wrong");
    } 
});
module.exports =  router;