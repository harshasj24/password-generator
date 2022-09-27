const express = require("express");
const router = express.Router();
const {
  login,
  signUp,
  setvaultPassword,
  validateUserPassword,
} = require("../controllers");

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/validatePassword", validateUserPassword);
module.exports = router;
