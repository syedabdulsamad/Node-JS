const exercise = require("../exercise1");
 describe("Exercise", () => {
     it("should return exception when input is not a Number", () => {
         expect(() => {exercise.fizzBuzz("String")}).toThrow(); 
         expect(() => {exercise.fizzBuzz(null)}).toThrow(); 
         expect(() => {exercise.fizzBuzz('')}).toThrow(); 
         expect(() => {exercise.fizzBuzz(false)}).toThrow(); 
     });

     it("should return FizzBuzz when input (15) is devisible by 3 and 5",() => {
        const result = exercise.fizzBuzz(15);
        expect(result).toBe("FizzBuzz");
     });

     it("should return Fizz when input (9) is only devisible by 3",() => {
        const result = exercise.fizzBuzz(9);
        expect(result).toBe("Fizz");
     });

     it("should return Fizz when input (10) is only devisible by 5",() => {
        const result = exercise.fizzBuzz(10);
        expect(result).toBe("Buzz");
     });

     it("should return the input number back if its neither divisible by 3 nor 5",() => {
        const result = exercise.fizzBuzz(14);
        expect(result).toBe(14);
     });






 });