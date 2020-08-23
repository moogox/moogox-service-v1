var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Wallet = require("../../models/Wallet");
const Order = require("../../models/Order");
const CancelOrder = require("../../models/CancelOrder");
const CancelOrderV2 = require("../../models/CancelOrderV2");

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
        orderDescription: req.body.orderDescription,
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,
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

router.post("/order/get", (req, res) => {
  Order.findOne({
    _id: req.body.id,
  })
    .then((orderResult) => {
      res.json({ orderResult });
    })
    .catch((err) => {
      res.status(404);
    });
});

router.post("/order/list", (req, res) => {
  User.findOne({
    _id: req.body.userId,
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

router.post("/order/cancel/1", (req, res) => {
  Order.findOneAndUpdate(
    { _id: req.body.orderId },
    { $set: { status: "CANCEL" } }
  )
    .then((cancelResult) => {
      const newCancelOrder = new CancelOrder({
        user: req.body.user,
        reason: req.body.reason,
        returnAmount: req.body.returnAmount,
        bank: req.body.bank,
        rekeningNumber: req.body.rekeningNumber,
        accountName: req.body.accountName,
        retrevialStatus: req.body.retrevialStatus,
        order: req.body.orderId,
      });

      newCancelOrder
        .save()
        .then((cancelRespon) => {
          res.json({ cancelRespon, cancelResult });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ msg: "err when canceling order" });
    });
});

router.post("/order/cancel/2", (req, res) => {
  Order.findOneAndUpdate(
    { _id: req.body.orderId },
    { $set: { status: "CANCEL" } }
  )
    .then((cancelResult) => {
      const newCancelOrder = new CancelOrderV2({
        user: req.body.user,
        reason: req.body.reason,
        order: req.body.orderId,
      });

      newCancelOrder
        .save()
        .then((cancelRespon) => {
          res.json({ cancelRespon, cancelResult });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ msg: "err when canceling order" });
    });
});

module.exports = router;
