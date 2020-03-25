 const {User} = require("../../models/user");
 const {Genere} = require("../../models/genere");
 const request = require("supertest");
let token;

 describe("middleware", () => {

        // beforeEach(() => {
        //     console.log("Before each Middleware");
        //     token = new User().generateAuthToken();
        //     server = require("../../index");
        // });
    
        // afterEach(async () => {
        //     console.log("After each Middleware");
        //     await Genere.deleteMany({});
        //     await server.close();
        // });

        beforeAll(() => {
            console.log("Before All Middleware");
            server = require("../../index");
        });
    
        afterAll(async () => {
            console.log("After All Middleware");
            await server.close();
        });

        beforeEach(()=> {
            console.log("before Each Middleware");
            token = new User().generateAuthToken();
        });

        afterEach(async() => {
            console.log("After Each Middleware");
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

        it("should set request.user propertyy if proper JWT token is sent", async() => {
            const res = await exec();
            expect(res.status).toBe(201); 
        });
  });