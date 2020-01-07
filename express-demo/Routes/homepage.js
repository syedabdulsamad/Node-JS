const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.render("index", {title: "Express Demo", myboldHeading: "Hello Thinggggg!"})
});

module.exports = router;