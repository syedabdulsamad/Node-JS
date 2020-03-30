const request = require("supertest");
const {RentalReturn} = require("../../models/returns");
const {User} = require("../../models/user");
const mongoose = require("mongoose");
let server;
let rentalReturn;
let movieId;
let customerId;
let token;
beforeAll(() => {
    server = require("../../index");
});

afterAll(async() => {
    await server.close();
});

describe("/post", () => {

    beforeEach( async() => {
        token = new User().generateAuthToken();
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        dateIn = null;

        rentalReturn = new RentalReturn({
            customer: {
                _id: customerId,
                name: "12345",
                isGold: true,
                phone: "1234567891"
            }, 
            movie: {
                _id: movieId,
                title: "123456789",
                dailyRentalRates: 10
            }
        });
        await rentalReturn.save();
    });


    
    afterEach(async()=> {
        await RentalReturn.deleteMany({});
    });

    it("should have object in DB", async() => {
        const result = await RentalReturn.findById(rentalReturn._id);

        expect(result).not.toBeNull();
        expect(result.customer._id.toHexString()).toEqual(customerId.toHexString());  
    });

    it("should return 401 if the user is not logged in", async() => {
        token = "";
        // { customerId, movieId } is equivalent to { customerId: customerId, movieId: movieId }
        const res = await request(server)
        .post("/api/returns")
        .send({ customerId, movieId });

        expect(res.status).toBe(401);
    });

    it("should return 400 is customerid is not provided", async() => {

        const res = await request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({ movieId });

        expect(res.status).toBe(400);
    });

    it("should return 404 if no rental is found for provided customerId and movieId", async() => {
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        const res = await request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({customerId, movieId});

        expect(res.status).toBe(404);
    });

    it("should return 200 if movie is found for provided customerId and movieId", async() => {
        const res = await request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({customerId, movieId});

        expect(res.status).toBe(200);
    });

    it("should return 400 if dateIn is set for the record", async() => {
        rentalReturn.dateIn = Date.now()
        await rentalReturn.save();

        const res = await request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({customerId, movieId});

        expect(res.status).toBe(400);
    });

    it("should test if return date is set", async() => {

        const res = await request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({customerId, movieId});


        // why i need to do that... Check
        const obj = JSON.parse(res.text,null);
        const fetchedRental = await RentalReturn.findById(rentalReturn._id);
        expect(fetchedRental.dateIn).not.toBeNull();
    });



});