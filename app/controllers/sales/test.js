const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const SalesController = require('./index');
const testHelper = require('../../utils/test.helper');
const mongoose = require('mongoose');

beforeEach(testHelper.setupTest);

let _id="";

const orderData= () => {

  return{
    customerId: faker.random.uuid(),
    items: [{
      productId: faker.random.uuid(),
      productQuantity: faker.random.number(),
      productPrice: faker.random.number(),

    }],
    totalPrice: faker.random.number()
  }

}

//console.log("OrderData:" , orderData())
console.log("Id:", _id)

describe('Sales', () => {
  describe('CREATE', () => {
    let body = orderData()

    let sum = 0;
    for(var i=0; i<body.items.length;i++)
    {
        sum = sum + Number(body.items[i].productPrice)
    }
  
    body.totalPrice=sum
    console.log("Body:", body)

    it('should add a new order', async () => {
      const result = await SalesController.create(body);
     // console.log("Result:", result)
     _id=result._id;
      expect(result.customerId).to.equal(body.customerId);
      expect(result.items.productId).to.equal(body.items.productId);
      expect(result.items.productQuantity).to.equal(body.items.productQuantity);
      expect(result.items.productPrice).to.equal(body.items.productPrice);
      expect(result.total).to.equal(body.totalPrice);
    });

  describe('GET ORDER', () => {
    let body = orderData()
    it('should return array of orders', async () => {
      const result = await SalesController.findById(_id);
      console.log("Results:", result)
      expect(typeof result).to.equal('object');
    });
  })

  describe('GET ALL', () => {
    it('should return all orders', async () => {
      const result = await SalesController.all();
      console.log("Results:", result)
      expect(typeof result).to.equal('object');
    });
  })

  describe('UPDATE', () => {
    let body = orderData()
    it('should update orders', async () => {
      const result = await SalesController.update(_id, body);
      console.log("Results:", result)
      expect(typeof result).to.equal('object');
      
    });
  })

  describe('DELETE', () => {
    it('should update orders', async () => {
      const result = await SalesController.remove(_id);
      console.log("Results:", result)
      expect(typeof result).to.equal('object');
      
    });
  })


})

})
