const mongoose = require("mongoose");
const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);


const {MovieSchema, validateMovie, Movie} =  require("./movie");
const {CustomerSchema, validateCustomer, Customer} =  require("./customer");

const rentalSchema = mongoose.Schema({
    movie: MovieSchema,
    customer: CustomerSchema
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = {
        // movieId: Joi.objectId().required(),
        // customerId: Joi.objectId().required()
         movieId: Joi.string().required(),
         customerId: Joi.string().required()
    };
    return Joi.validate(rental,schema);
}

module.exports.RentalSchema = rentalSchema;
module.exports.validateRental = validateRental;
module.exports.Rental = Rental;