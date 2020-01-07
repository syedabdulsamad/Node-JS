const Joi = require("joi");
const express = require("express");
const router = require("./Routers/genere");
const app = express();

app.use(express.json());
app.use("/api/geners", router);

const port = process.env.port || 4000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});
