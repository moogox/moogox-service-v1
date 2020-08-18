const express = require("express");
const router = express.Router();
const Wallet = require("../../models/Wallet");
const User = require("../../models/User");

router.post("/get", (req, res) => {
  Wallet.findOne({ user: "5f21a0a7e857a400173e695d" })
    .then((walletResult) => {
      res.json({ walletResult });
    })
    .catch((err) => {
      res.status(404).json({ msg: "error when finding and update user" });
    });
});

router.post("/withdrawal", (req, res) => {
  User.findOne({
    _id: req.body._id,
  })
    .then((withdrawal) => {
      Wallet.findOneAndUpdate({});
    })
    .catch(() => res.status(404).json({ msg: "Error When Finding User" }));
});

module.exports = router;
