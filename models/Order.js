const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numberPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  merk: {
    type: String,
    required: true,
  },
  plat: {
    type: String,
    required: true,
  },
  orderDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    required: true,
  },
  totalPayment: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
