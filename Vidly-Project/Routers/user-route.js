const app = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlware/auth");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const router = app.Router();
const {User, validateUser} = require("../models/user");

router.get("/", async(req, res) => {

    const users = await User.find();
    res.send(users);
});

router.get("/me", auth, async(req, res) => {
    if(!req.user._id) {
        return res.status(500).send("Something ent wrong");
    } 
    const user = await User.findById(req.user._id)
    .select("-password")
    if(!user) {
        return res.status(404).send("User not found");
    }
    res.send(user);
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

    const filteredUser = lodash.pick(user, ["name", "email", "_id"]);
    const token = user.generateAuthToken();
    res.header({"x-auth-token": token}).send(filteredUser);
});

module.exports = router;