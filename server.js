const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routers/api/users");
const transactions = require("./routers/api/transactions");

const app = express();
var fs = require("fs");
const wallet = require("./routers/api/wallets");

var corsOptions = {
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  optionsSuccessStatus: 200,
  origin: "*",
};

app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("upload"));

app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "this server owned by moogox.id if you try to using this server without official permission of moogox.id you will get the  severe criminal penalti "
  );
});

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", cors(corsOptions), users);
app.use("/api/transactions", cors(corsOptions), transactions);
app.use("/api/wallet", cors(corsOptions), wallet);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server Already Running On Port ${port}`));
