const app = require("express");
const router = app.Router();
const {validateMovie, Movie} = require("../models/movie");
const {GenereSchema, Genere} = require("../models/genere");

router.get("/", async(req, res) => {
    const movies = await Movie.find()
    .select({"type": "1", "genere": "1", "numberInStock": "1", "dailyRentalRates":"1"});
    res.send(movies);
})

router.post("/", async (req, res) => {
    const result = validateMovie(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const genere = await Genere.findById(req.body.genereId);
    if(genere == null) {
        return res.status(404).send("the genere with given id id not found.");
    }

    const newMovie = new Movie({
        title: req.body.title,
        genere: {_id: genere.id, name: genere.name},
        numberInStock: req.body.numberInStock,
        dailyRentalRates: req.body.dailyRentalRates
    });
    return res.send(await newMovie.save());
});

module.exports = router;
