const express = require("express");
const router = express.Router();
const Wallet = require("../../models/Wallet");
const User = require("../../models/User");

router.post("/withdrawal", (req, res) => {
  User.findOne({
    _id: req.body._id,
  })
    .then((withdrawal) => {
      Wallet.findOneAndUpdate({});
    })
    .catch(() => res.status(404).json({ msg: "Error When Finding User" }));
});
