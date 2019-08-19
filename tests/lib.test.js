const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");
/*
 * Testing absolute number
 */

describe("absolute function", () => {
  it("if input is positive, return positive number", () => {
    const result = lib.absolute(1); //test
    expect(result).toBe(1);
  });
  it("if input is negative, return positive number", () => {
    const result = lib.absolute(-1); //test
    expect(result).toBe(1);
  });
  it(" if input is 0, return 0", () => {
    const result = lib.absolute(0); //test
    expect(result).toBe(0);
  });
});

describe("greet function", () => {
  it("should return the greeting msg", () => {
    const result = lib.greet("Erjon"); //test
    expect(result).toMatch(/Erjon/);
  });
});

/*
 *Testing arrays
 */

describe("getCurrencies function", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies("Erjon"); //test

    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));
  });
});

/*
 *Testing objects
 */
describe("getProduct function", () => {
  it("should return the product with the given Id", () => {
    const result = lib.getProduct(1); //test

    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

/*
 *Testing exceptions
 */
describe("registerUser function", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(i => {
      expect(() => {
        lib.registerUser(i);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed ", () => {
    const result = lib.registerUser("erjon");
    expect(result).toMatchObject({ username: "erjon" });
    expect(result.id).toBeGreaterThan(0);
  });
});

/*
 *Mock functions
 */
describe("applyDiscount", () => {
  it("Should apply 10% discount if costumer has more than 10 points", () => {
    db.getCustomerSync = function(costumerId) {
      console.log("Fake reading costumer");
      return { id: costumerId, points: 20 };
    };
    const order = { costumerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

/*
 *Mock functions , notifyCustomer
 */
describe("notifyCustomer", () => {
  it("should send an email to the costumer", () => {
    db.getCustomerSync = function(costumerId) {
      return { email: "this is an email msg" };
    };
    let mailSent = false;
    mail.send = function(email, message) {
      mailSent = true;
    };
    lib.notifyCustomer({ costumerId: 1 });
    expect(mailSent).toBe(true);
  });
});

/*
 *Mock functions , notifyCustomer . Another example for mock func,in jest
 */
describe("notifyCustomer", () => {
  it("should send an email to the costumer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "email msg" });
    mail.send = jest.fn();

    lib.notifyCustomer({ costumerId: 1 });
    expect(mail.send).toHaveBeenCalled();
  });
});
