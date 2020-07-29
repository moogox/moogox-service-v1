const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WithdrawalSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 0,
  },
  bank: {
    type: String,
    default: 0,
  },
  rekening: {
    type: String,
    default: 0,
  },
  amount: {
    type: String,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Withdrawal = mongoose.model("withdrawal", WithdrawalSchema);
