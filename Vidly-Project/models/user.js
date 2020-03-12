const mongoose = require("mongoose");
const lodash =  require("lodash");
const config =  require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const PasswordComplexity = require("joi-password-complexity");
const userSchema = mongoose.Schema({
    name : String,
    password: String,
    email: {
        type: String,
        unique: true
    }, 
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {

    const filteredUser = lodash.pick(this, ["_id", "name", "email", "isAdmin"]);
    const token = jwt.sign(filteredUser, config.get("vidly_auth_private_key"));
    return token;
};

const User = mongoose.model("user", userSchema);
function validateUser(userBody) {

    const passwordOptions = {
            min: 8,
            max: 26,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4,
          };

    const schema = Joi.object({
        name:  Joi.string().required().min(5),
        email: Joi.string().email().required(),
        password: PasswordComplexity(passwordOptions).required()
    });
    return schema.validate(userBody);
}

module.exports.User = User;
module.exports.validateUser = validateUser;