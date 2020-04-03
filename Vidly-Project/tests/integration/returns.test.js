const request = require("supertest");
const {RentalReturn} = require("../../models/returns");
const {User} = require("../../models/user");
const {Movie} = require("../../models/movie");
const mongoose = require("mongoose");
let server;
let rentalReturn;
let movieId;
let movie;
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

        movie = new Movie({
            _id: movieId,
            title: "123456789",
            numberInStock: 10,
            genere: {name: "1234567"},
            dailyRentalRates: 10
        });

        await movie.save();

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

    const exec = () => {
        return request(server)
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({customerId, movieId});
    }

    it("should have object in DB", async() => {
        const result = await RentalReturn.findById(rentalReturn._id);

        expect(result).not.toBeNull();
        expect(result.customer._id.toHexString()).toEqual(customerId.toHexString());
        
    });

    it("should return 401 if the user is not logged in", async() => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it("should return 400 is customerid is not provided", async() => {
        customerId = null;
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it("should return 404 if no rental is found for provided customerId and movieId", async() => {
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        const res = await exec()
        expect(res.status).toBe(404);
    });

    it("should return 400 is rental is already processed", async() => {

        rentalReturn.dateIn = Date.now();
        await rentalReturn.save();

        const res = await exec()
        expect(res.status).toBe(400);
    })

    it("should return 200 if a valid request is sent", async() => {
        const res = await exec()
        expect(res.status).toBe(200);
    });

    it("should set the return date and check if it exists", async() => {
        const res = await exec()
        const rentalInDB = await RentalReturn.findById(rentalReturn._id);
        expect(rentalInDB.dateIn).toBeDefined();

    });

    it("should check if rental fee is correctly calculated", async() => {
        const res = await exec()
        const oneDay = 24 * 60 * 60 * 1000; 
        const rentalInDB = await RentalReturn.findById(rentalReturn._id);

        let fee = Math.abs((rentalInDB.dateIn - rentalInDB.dateOut)/oneDay) * rentalInDB.movie.dailyRentalRates;
        if(fee < 0) {
            fee = rentalInDB.movie.dailyRentalRates;
        }
        console.log(fee);
        expect(rentalInDB.rentalFee).toBe(fee);
    });


    it("should increase the movie stock if returned successfully", async() => {
        const res = await exec()
        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1) ;
    });

    it("should match the rental and rental in DB Object and they should be same", async() => {
        const res = await exec()
        const rentalInDB = await RentalReturn.findById(rentalReturn._id);
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["dateOut", "dateIn", "rentalFee", "customer", "movie"])
        );
    });

});