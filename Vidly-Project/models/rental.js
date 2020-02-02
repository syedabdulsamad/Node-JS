const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const {MovieSchema, validateMovie, Movie} =  require("./movie");
const {CustomerSchema, validateCustomer, Customer} =  require("./customer");

const rentalSchema = mongoose.Schema({
    name: String,
    movie: MovieSchema,
    customer: CustomerSchema
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
   });
    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
