const mongoose = require("mongoose");
const ExportModel = require("../utils/mongoose-model-export");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    items: [
      {
        sku: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = ExportModel(mongoose, "Sale", schema);
