const express = require("express");
const router = express.Router();
const { authorizeToken, authorize } = require("../middlewares/auth/auth");
const {
  login,
  signUp,
  setvaultPassword,
  validateUserPassword,
} = require("../controllers");
// /users
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/validatePassword", validateUserPassword);
module.exports = router;
