const Joi = require("joi");
const mongoose =  require("mongoose")

const GenereSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 4}
});

const Genere = mongoose.model("Genere", GenereSchema);

module.exports.Genere = Genere;
module.exports.GenereSchema = GenereSchema;