const express = require("express");
const auth = require("../middlware/auth");
const {RentalReturn ,validateRentalReturn} =  require("../models/returns");
const router = express.Router();


router.post("/", auth, async(req, res) => {

    console.log("Request body is " + JSON.stringify(req.body, null, 2));
    const validationResult = validateRentalReturn(req.body)
    if(validationResult.error != null ){
        console.log("Error :" + validationResult.error.message);
        return res.status(400).send("Invalid request");
    } 

    const result = await RentalReturn.findOne({ "customerId": req.body.customerId, "movieId": req.body.movieId});
    if(result == null) {
        return res.status(404).send("Not found");
    }
    return res.status(200).send(result);
});

module.exports = router;