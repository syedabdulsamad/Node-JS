const Joi = require("joi");
const mongoose =  require("mongoose");
const express = require("express");
const router = require("./Routers/genere");
const customerRouter =  require("./Routers/customer-route");
const app = express();

app.use(express.json());
app.use("/api/geners", router);
app.use("/api/customers", customerRouter);

const port = process.env.port || 4000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});

mongoose.connect("mongodb://localhost/vidly", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {console.log("Connected to vidly database")})
.catch((error)=> {console.log(error.message)});


