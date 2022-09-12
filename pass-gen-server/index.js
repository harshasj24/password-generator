const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4500;
const userRouter = require("./routes/users");
const vaultRouter = require("./routes/vault");

require("dotenv").config();

// db connection
require("./db/db").dbConnection;

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

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server Online! running at http://localhost:${port}`);
  }
});
