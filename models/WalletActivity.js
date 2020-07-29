const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletActivitySchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  //jumlah dinar (gram) yang dimiliki
  type: {
    type: Number,
    default: 0,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  ket: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = WalletActivity = mongoose.model(
  "wallet_activity",
  WalletActivitySchema
);
