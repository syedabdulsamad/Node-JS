const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    isGold: {type: String, default: false},
    name: {type: String, required: true, minlegth: 5},
    phone: {type: String, required: true, minlegth: 9}
});
const Customer = mongoose.model("Customer", CustomerSchema);

function validateCustomer (customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(5),
        isGold: Joi.bool().required(),
        phone: Joi.string().required().min(9)
    });
    return schema.validate(customer);
}

module.exports.CustomerSchema = CustomerSchema;
module.exports.validateCustomer = validateCustomer;
module.exports.Customer = Customer;