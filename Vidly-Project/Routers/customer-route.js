const {Customer, validateCustomer} = require("../models/customer");
const app = require("express");
const router = app.Router();

router.get("/", async (req, res) => {
    const courses = await Customer.find();
    res.send(courses);
});

router.post("/", async (req, res) => {
    const result = validateCustomer(req.body)
    if(result.error) {
        res.status(400).send(result.error.message);
    }
    const customer = new Customer(req.body);
    const newCustomer = await customer.save();
    res.send(newCustomer);
});

router.put("/:id", async(req, res) => {

    if(validateCustomer(req.body).error) {
        res.status(400).send(result.error.message);
    }
    await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name, phone: req.body.phone, isGold: req.body.isGold}, {new: true}, (error, result) => {
        if(error) {
            res.status(404).send(error);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;