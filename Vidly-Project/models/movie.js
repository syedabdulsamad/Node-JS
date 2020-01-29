const Joi = require("joi");
const mongoose = require("mongoose");
const {Genere, GenereSchema} = require("./genere");

const movieSchema = mongoose.Schema({
    title:
     { type: String, required: true, minlength: 3 },
    genere: GenereSchema,
    numberInStock: {type: Number, default: 0},
    dailyRentalRates: {type: Number, default: 10}
});


const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = { 
        title: Joi.string().required().min(5),
        genereId: Joi.string().required(),
        numberInStock: Joi.number().positive(),
        dailyRentalRates: Joi.number().positive()
    }
    return Joi.validate(movie, schema);
}
module.exports.MovieSchema = movieSchema;
module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;



