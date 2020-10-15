'use strict';
require('./app/config/db');
const send = require('./app/utils/response');
const ProductsController = require('./app/controllers/products');
const { formatBody } = require('./app/utils/helpers');

const countProducts = async (event, context) => {
  console.log('NODE_ENV', process.env.IS_OFFLINE);
  let response = await ProductsController.count();
  return send(response);
};

const getAllProducts = async (event, context) => {
  let response = await ProductsController.all();
  return send(response);
};

const createProduct = async (event, context) => {
  const request = formatBody(event);
  console.log('event.Record', request);
  let response = await ProductsController.create(request.source, request.body);
  return send(response);
};

module.exports = {
  count: countProducts,
  all: getAllProducts,
  create: createProduct,
};
