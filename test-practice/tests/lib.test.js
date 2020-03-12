const lib = require("../lib");
const db = require("../db");
describe("absolute", () =>  {
    it("should return number greater than zero", () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it("should return number is negative", () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
        
    });
    
    it("should return number is zero", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0); 
    });
});

describe("Greet", () => {
    it("should return same name as passed with Hello", () => {
    const result = lib.greet("Abdul");
    expect(result).toMatch(/Welcome/);
    });
});

describe("Currencies", ()=> {
    it("should check the currencies in the array", () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(["USD", "AUD"]));
    });
});

describe("Apply Discount", () => {
    it("should return 90% of the price is point are greater than 10",() => {
        db.getCustomerSync = jest.fn()
        .mockReturnValueOnce({id: 1, points: 20})
        .mockReturnValueOnce({id: 2, points: 9});

        const order = {customerId: 1, totalPrice: 10};
        const result = lib.applyDiscount(order);
        expect(result.totalPrice).toBe(9);

        const order2 = {customerId: 2, totalPrice: 25 };
        const result2 = lib.applyDiscount(order2);
        expect(result2.totalPrice).toBe(25);
    });
});

