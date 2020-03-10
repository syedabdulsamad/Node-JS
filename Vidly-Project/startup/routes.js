const express = require("express");
const error = require("../middlware/error");
const router = require("../Routers/genere-route");
const movieRouter = require("../Routers/movie-route");
const customerRouter = require("../Routers/customer-route");
const rentalRouter = require("../Routers/rental-route");
const userRouter = require("../Routers/user-route");
const authRouter = require("../Routers/auth-route");

module.exports = function(app) {
    app.use(express.json());
    app.use("/api/movies", movieRouter);
    app.use("/api/geners", router);
    app.use("/api/rentals", rentalRouter);
    app.use("/api/customers", customerRouter);
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.use(error);
}