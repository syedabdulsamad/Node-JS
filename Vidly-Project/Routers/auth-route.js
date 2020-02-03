const app = require("express");
const {User, validateUser} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const router = app.Router();


router.post("/", async(req, res) => {

    const result = validate(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message.message);
    }
    
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        console.log("email mismatch");
        return res.status(400).send("invalid email or password");
    }
    
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated) {
        console.log("password mismatch");
       return res.status(400).send("invalid email or password");
    }
    res.send(true);
});


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(req);
}

module.exports = router;