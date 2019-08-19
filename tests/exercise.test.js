const exercise = require("../exercise");

/*
 *Testing exercise file ,fizzBuzz function
 */
describe("fizzBuzz function", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => {
      exercise.fizzBuzz("i").toThrow();
      exercise.fizzBuzz(null).toThrow();
      exercise.fizzBuzz(undefined).toThrow();
      exercise.fizzBuzz({}).toThrow();
    });
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is only divisible by 3 ", () => {
    const result = exercise.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
  it("should return input, if input is not divisible by 3 or 5 ", () => {
    const result = exercise.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
