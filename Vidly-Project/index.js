const Joi = require("joi");
const mongoose =  require("mongoose");
const express = require("express");
const router = require("./Routers/genere-route");
const customerRouter =  require("./Routers/customer-route");
const movieRouter = require("./Routers/movie-route");
const rentalsRouter = require("./Routers/rental-router");
const {validateMovie, Movie} = require("./models/movie");
const app = express();

app.use("/api/generes", router);
app.use("/api/rentals", rentalsRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movie", movieRouter);

const port = process.env.port || 4000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});

mongoose.connect("mongodb://localhost/vidly", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {console.log("Connected to vidly database")})
.catch((error)=> {console.log(error.message)});
