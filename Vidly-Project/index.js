const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const winston = require("winston");
const mongoose =  require("mongoose");
const config =  require("config");
const express = require("express");

const error = require("./middlware/error");
const router = require("./Routers/genere-route");
const movieRouter = require("./Routers/movie-route");
const customerRouter = require("./Routers/customer-route");
const rentalRouter = require("./Routers/rental-route");
const userRouter = require("./Routers/user-route");
const authRouter = require("./Routers/auth-route")

const app = express();

app.use(express.json());

app.use("/api/movies", movieRouter);
app.use("/api/geners", router);
app.use("/api/rentals", rentalRouter);
app.use("/api/customers", customerRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(error);

winston.add(winston.transports.File, {filename: "logfile.log"}); 

if(!config.get("vidly_auth_private_key")) {

    console.log("Authorization key not found... EXITING app...");
    process.exit(1);
}

const port = process.env.port || 4000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});

mongoose.connect("mongodb://localhost/vidly", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {console.log("Connected to vidly database")})
.catch((error)=> {console.log(error.message)});