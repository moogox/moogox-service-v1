const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  //jumlah dinar (gram) yang dimiliki
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = Wallet = mongoose.model("wallet", walletSchema);
