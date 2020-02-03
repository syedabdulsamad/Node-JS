const app = require("express");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const router = app.Router();
const {User, validateUser} = require("../models/user");

router.get("/", async(req, res) => {

    const users = await User.find();
    res.send(users);
});

router.post("/", async(req, res) => {

    const result = validateUser(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const user = new User( lodash.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(lodash.pick(user, ["name", "email", "_id"]));
});

module.exports = router;