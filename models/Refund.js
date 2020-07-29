const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Refund = new Schema({
  user: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

module.exports = Refund = mongoose.model("refunds", Refund);
