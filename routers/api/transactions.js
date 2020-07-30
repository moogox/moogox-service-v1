var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Wallet = require("../../models/Wallet");
const Order = require("../../models/Order");

router.post("/order/new", (req, res) => {
  User.findOne({
    _id: req.body.userId,
  })
    .then((userResult) => {
      const newOrder = new Order({
        user: req.body.userId,
        orderType: req.body.orderType,
        name: req.body.name,
        numberPhone: req.body.numberPhone,
        address: req.body.address,
        vehicleType: req.body.vehicleType,
        merk: req.body.merk,
        plat: req.body.plat,
        vehicleImg: req.body.vehicleImg,
        orderDescription: req.body.orderDescription,
        status: req.body.status,
        totalPayment: req.body.totalPayment,
        paymentMethod: req.body.paymentMethod,
      });

      newOrder
        .save()
        .then((transactionResult) => {
          res.json({ transactionResult });
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ msg: "err user not found" });
    });
});

router.post("/order/list", (req, res) => {
  User.findOne({
    id: req.body.userId,
  })
    .then((userResult) => {
      Order.find({
        user: req.body.userId,
      })
        .then((orderResult) => {
          res.json({ orderResult });
        })
        .catch((err) => {
          res.status(404).json({ msg: "err when finding of orders" });
        });
    })
    .catch((err) => {
      res.status(404).json({ msg: "user not found" });
    });
});

module.exports = router;
