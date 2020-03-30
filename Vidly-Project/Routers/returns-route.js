const express = require("express");
const auth = require("../middlware/auth");
const {RentalReturn ,validateRentalReturn} =  require("../models/returns");
const router = express.Router();


router.post("/", auth, async(req, res) => {

    const validationResult = validateRentalReturn(req.body)
    if(validationResult.error != null ){
        return res.status(400).send("Invalid request");
    } 
    const result = await RentalReturn.findOne({
        "customer._id": req.body.customerId,
        "movie._id": req.body.movieId
        });

    if(result == null) {
        return res.status(404).send("Not found");
    }
    if (result.dateIn != null) {
        return res.status(400).send("Already processed record");
    }
    result.dateIn = Date.now()
    await result.save();
    return res.status(200).send(result);
});

module.exports = router;