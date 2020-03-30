const request = require("supertest");
let server;
const {Genere} = require("../../models/genere");
const {User} = require("../../models/user");

describe("/api/genere", () => {
    
    beforeAll(() => {
            server = require("../../index");
        });
        afterAll(async () => {
            await server.close();
        });
    

    describe("/GET", () => {
        afterEach(async() =>{
            await Genere.deleteMany({});
        });

        it("should return list of generes", async() => {
            await Genere.insertMany([
                {name: "genre1"},
                {name: "genre2"},
                {name: "genre3"}
            ]);
            const res = await request(server).get("/api/geners");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.map(g => g.name)).toContain("genre1");
        });
    });

    describe("/GET/:id", () => {

        afterEach(async() =>{
            await Genere.deleteMany({});
        });
        
        
        it("should return genre with id", async() => {
            const genre = new Genere({name: "genre1"});
            await genre.save();
            const res = await request(server).get("/api/geners/"+ genre.id);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("genre1");
        });

        it("should return error with invalid id", async() => {
            const genre = new Genere({name: "genre1"});
            await genre.save();
            const res = await request(server).get("/api/geners/1");
            expect(res.status).toBe(404);
            expect(res.text).toMatch(/Invalid/);
            
        });
    });

    describe("/POST", () => {
        afterEach(async() =>{
            await Genere.deleteMany({});
        });

        it("should return 401 if not authorized", async() => {
            const genere = new Genere({name: "genere1"});
            const res = await request(server).post("/api/geners").send(genere);
            expect(res.status).toBe(401);
        });

        it("should return 400 if the name is less than 4 chars", async() => {
            const res = await createRequestWithGenre({name: "g1"});
            expect(res.status).toBe(400);
        });

        it("should return 400 if the name is greater than 25 chars", async() => {
            const genreName = Array(26).fill("a").join("");
            const res = await createRequestWithGenre({name: genreName})
            expect(res.status).toBe(400);
        });

        it("should return 201 with gener object if proper object is sent", async() => {
            const res = await createRequestWithGenre({name: "genre1"})
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name", "genre1");

            const genre = await Genere.find({ name: "genre1"});
            expect(genre).not.toBe(null);
        });

        async function createRequestWithGenre(genre) {
            const token = new User().generateAuthToken();
            return await request(server)
            .post("/api/geners")
            .set("x-auth-token", token)
            .send(genre);
        }
    });
});