const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CancelOrderV2Schema = new Schema({
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
});

module.exports = CancelOrderV2 = mongoose.model(
  "cancelOrdersv2",
  CancelOrderV2Schema
);
