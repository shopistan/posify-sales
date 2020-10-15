const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const ProductsController = require('./index');
const testHelper = require('../../utils/test.helper');

beforeEach(testHelper.setupTest);

const getProductBody = () => {
  return {
    name: faker.name.findName(),
  };
};

describe('Products', () => {
  describe('Create', () => {
    it('should return array of products', async () => {
      const result = await ProductsController.all();
      expect(typeof result).to.equal('object');
    });
    it('should return count of the products', async () => {
      const result = await ProductsController.count();
      expect(typeof result.count).to.equal('number');
    });
  });
});
