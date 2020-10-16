const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-as-promised"));
const faker = require("faker");
const SalesController = require("./index");
const testHelper = require("../../utils/test.helper");
const mongoose = require("mongoose");

beforeEach(testHelper.setupTest);

let _id = "";

const orderData = () => {
  return {
    customer: {
      email: faker.internet.email(),
    },

    items: [
      {
        sku: faker.commerce.productAdjective(),
        quantity: faker.random.number(),
        price: faker.random.number(),
      },
    ],
    totalPrice: faker.random.number(),
  };
};

console.log("OrderData:", orderData());

describe("Sales", () => {
  describe("CREATE", () => {
    let body = orderData();

    let sum = 0;
    for (var i = 0; i < body.items.length; i++) {
      sum = sum + Number(body.items[i].price);
    }

    body.totalPrice = sum;
    console.log("Body:", body);

    it("should add a new order", async () => {
      const result = await SalesController.create(body);
      console.log("Result:", result);
      _id = result._id;
      expect(result.email).to.equal(body.customer.email);
      expect(result.items.sku).to.equal(body.items.sku);
      expect(result.items.quantity).to.equal(body.items.quantity);
      expect(result.items.price).to.equal(body.items.price);
      expect(result.total).to.equal(body.totalPrice);
    });

    describe("GET ORDER", () => {
      let body = orderData();
      it("should return array of orders", async () => {
        const result = await SalesController.findById(_id);
        console.log("Results:", result);
        expect(typeof result).to.equal("object");
      });
    });

    describe("GET ALL", () => {
      it("should return all orders", async () => {
        const result = await SalesController.all();
        console.log("Results:", result);
        expect(typeof result).to.equal("object");
      });
    });

    describe("UPDATE", () => {
      let body = orderData();
      it("should update orders", async () => {
        const result = await SalesController.update(_id, body);
        console.log("Results:", result);
        expect(typeof result).to.equal("object");
      });
    });

    describe("DELETE", () => {
      it("should update orders", async () => {
        const result = await SalesController.remove(_id);
        console.log("Results:", result);
        expect(typeof result).to.equal("object");
      });
    });
  });
});
