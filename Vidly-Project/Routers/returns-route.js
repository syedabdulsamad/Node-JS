const express = require("express");
const auth = require("../middlware/auth");
const {RentalReturn ,validateRentalReturn} =  require("../models/returns");
const {Movie} =  require("../models/movie");
const router = express.Router();


router.post("/", auth, async(req, res) => {

    const validationResult = validateRentalReturn(req.body)
    if(validationResult.error != null ){
        return res.status(400).send("Invalid request");
    } 

    let result = await RentalReturn.findOne({ "customer._id": req.body.customerId, "movie._id": req.body.movieId});
    if(result == null) {
        return res.status(404).send("Not found");
    }
    
    // if dateIn is already set then return 400
    if(result.dateIn) {
        return res.status(400).send("Rental already processed");
    }

    result.dateIn = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; 
    let rentalFee = Math.abs((result.dateIn - result.dateOut) / oneDay) * result.movie.dailyRentalRates;
    if(rentalFee < 0) {
        rentalFee = result.movie.dailyRentalRates;
    }

    result.rentalFee = rentalFee;
    await result.save();

    await Movie.update({_id: result.movie._id},{
        $inc: {numberInStock:1}
    });



    return res.status(200).send(result);
});

module.exports = router;