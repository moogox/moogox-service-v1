var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Wallet = require("../../models/Wallet");

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "Email Not Found" });
    } else {
      if (!user.activityStatus) {
        return res.status(404).json({ msg: "user belum konfirmasi email" });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: token,
                  user: user,
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Password Incorrect" });
          }
        });
      }
    }
  });
});

router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      User.findOne({ numberPhone: req.body.numberPhone }).then((uss) => {
        if (uss) {
          return res.status(400).json({ email: "Numberphone Already Exists" });
        } else {
          const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            numberPhone: req.body.numberPhone,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  res.send(user);
                })
                .catch((err) => res.status(404).json(err));
            });
          });
        }
      });
    }
  });
});

router.post("/SendEmailConfirmation", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "moogox.id@gmail.com",
      pass: "Talenta123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const userId = req.body._id;
  const name = req.body.name;
  const email = req.body.email;

  const output = `
  <div style="background-color: white;padding: 1rem; max-width: 40rem;margin: auto;">
  <div style="text-align:center;">
    <img
      src="https://i.ibb.co/6Yqz1Sk/moogox.png" />
  </div>
  <p style="font-size:16px;text-align:center">Hi ${name}</p>

  <p style="font-size:16px;text-align:center">Anda telah melakukan pendaftaran di Moogox.id</p>

  <p style="font-size:16px;text-align:center">Untuk melanjutkan proses pendaftaran, silahkan konfirmasi email anda
    dengan kunjungi link di bawah ini</p>
  <br />
  <div style="text-align: center;">
    <a class=”link” href="http://localhost:3000/email-verification/${userId}" target="_blank"
      style="background-color:#8BC341;padding:8px 16px;color:white;text-decoration:none;border-radius:5px">
      Konfirmasi email
    </a>
  </div>

  <br />
  <br />
  <br />
  <p style="font-size:15px;text-align: center;">
    Jika anda yang memiliki kesulitan atau pertanyaan perihal Moogox.id dapat menghubungi kami
    <br /> Senin - Jumat pukul 09.00 WIB hingga 16.00 WIB GMT+7
    <br />
    WhatsApp ke <b><a href="tel:6288233168920">+6288233168920</a> </b> , atau email ke <b> <a
        href="mailto:moogox.id@gmail.com">moogox.id@gmail.com</a></b>
  </p>
</div>

<hr>
  `;

  var mailOptions = {
    from: "Moogox Technologies <moogox.id@gmail.com>",
    to: email,
    subject: "Verifikasi Pendaftaran Akun Moogox.id Anda",
    html: output,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      res.send(info);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/setUserActivityStatus", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { activityStatus: true } }
  )
    .then((user) => {
      const NewWallet = new Wallet({
        user: req.body._id,
      });
      NewWallet.save()
        .then((walletResult) => {
          res.json({ walletResult, user });
        })
        .catch((err) => {
          res.status(404).json({ err });
        });
    })
    .catch((err) => {
      res.status(404).json({ msg: "error when finding and update user" });
    });
});

module.exports = router;
