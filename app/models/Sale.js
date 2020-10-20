const mongoose = require("mongoose");
const { Model } = require("../config/db");

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

module.exports = Model("Sale", schema);
