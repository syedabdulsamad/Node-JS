 const {User} = require("../../models/user");
 const {Genere} = require("../../models/genere");
 const request = require("supertest");
let token;

 describe("middleware", () => {

        beforeAll(() => {
            server = require("../../index");
        });
    
        afterAll(async () => {
            await server.close();
        });

        beforeEach(()=> {
            token = new User().generateAuthToken();
        });

        afterEach(async() => {
            await Genere.deleteMany({});
        });
        
        const exec = async() => {
            return await request(server)
            .post("/api/geners")
            .set("x-auth-token", token)
            .send({name: "gener1"});
        }

         it("should return 400 if invalid JWT token is sent", async() => {
            token = "invalid_token";
            const res = await exec();
            expect(res.status).toBe(400); 
            expect(res.text).toBe("Invalid auth token");
        });

        it("should set request.user property if proper JWT token is sent", async() => {
            const res = await exec();
            expect(res.status).toBe(201); 
        });
  });