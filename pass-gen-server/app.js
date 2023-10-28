const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const vaultRouter = require("./routes/vault");
const { responce } = require("./constants/responce");
require("dotenv").config();

// db connection
require("./db/db").dbConnection;
app.use(responce);

// middlewares
// cors policy
app.use(cors({ origin: "*" }));
// body parser middlewares
app.use(express.urlencoded({ extended: true }));
// json level middlewares
app.use(express.json());

// router level middlewares
app.use("/users", userRouter);
app.use("/vault", vaultRouter);

app.get("/check", (req, res, next) => {
  return res.Ok("hii hello");
});
module.exports = app;
