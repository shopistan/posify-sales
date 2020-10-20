"use strict";
require("./app/config/db");
const send = require("./app/utils/response");
const SalesController = require("./app/controllers/sales");
const { formatBody } = require("./app/utils/helpers");

const SNS = require("./app/utils/sns");
const { snsTopics } = require("./app/config/keys");

const sns = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
});

const createSaleOrder = async (event, context) => {
  let response = await SalesController.create(JSON.parse(event.body));
  return send(response);
};

//order created listener
const orderCreatedSns = async (event, context) => {
  console.log("Event:", JSON.stringify(event));
};

const getAllOrders = async (event, context) => {
  let response = await SalesController.all();
  return send(response);
};

const getOrderById = async (event, context) => {
  let id = event.pathParameters.id;
  console.log(id);
  let response = await SalesController.findById(id);
  return send(response);
};

const updateOrder = async (event, context) => {
  let response = await SalesController.update(
    event.pathParameters.id,
    JSON.parse(event.body)
  );
  return send(response);
};

const deleteOrder = async (event, context) => {
  let id = event.pathParameters.id;
  console.log(id);
  let response = await SalesController.remove(id);

  return send(response);
};

module.exports = {
  createOrder: createSaleOrder,
  allOrders: getAllOrders,
  orderById: getOrderById,
  update: updateOrder,
  deleteById: deleteOrder,
  orderCreatedListener: orderCreatedSns,
};
