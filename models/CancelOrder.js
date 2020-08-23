const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CancelOrderSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  returnAmount: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  rekeningNumber: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  retrevialStatus: {
    type: Boolean,
    required: true,
  },
});

module.exports = CancelOrder = mongoose.model(
  "cancelOrders",
  CancelOrderSchema
);
