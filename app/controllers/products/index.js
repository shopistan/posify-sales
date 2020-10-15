const { Product } = require('../../models');
const axios = require('axios');

const all = async () => {
  const products = await Product.find({});
  return products;
};

const count = async () => {
  const productCount = await Product.count({});
  return { count: productCount };
};

const create = async (source, body) => {
  let resp = await axios.post(
    'https://webhook.site/7aa41b8d-ca61-4202-ba7c-fcf6850dcc44',
    { source, body }
  );
  return resp;
};

module.exports = {
  all,
  count,
  create,
};
