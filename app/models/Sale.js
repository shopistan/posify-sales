const mongoose = require('mongoose');
const ExportModel = require('../utils/mongoose-model-export');

const schema = new mongoose.Schema(
  {
    // key: { type: String, required: true },
    // value: { type: String, required: true },
    customerId: String,
    items: [{
      productId: String,
      productQuantity: Number,
      productPrice: Number
    }],
    total: Number

  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = ExportModel(mongoose, 'Sale', schema);
