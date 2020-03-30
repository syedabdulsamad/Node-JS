const Joi = require("@hapi/joi");
const mongoose = require("mongoose")

const RentalReturn = mongoose.model("RentalReturn",mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String, 
                required: true, 
                minlegth: 5
            }, 
            isGold: {
                type: Boolean,
                required: true,
            }, 
            phone: {
                type: String,
                required: true,
                minlegth: 9
            }
        })
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3
            },
            dailyRentalRates: {
                type: Number, 
                default: 10
            }
          
        })
    },
    dateOut: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    dateIn: {
        type: Date
    },
    rentalFee: {
        type:Number
    }
}));

function validateRentalReturn(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}

module.exports.RentalReturn = RentalReturn;
module.exports.validateRentalReturn = validateRentalReturn;