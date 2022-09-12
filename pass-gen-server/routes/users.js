const express = require("express");
const router = express.Router();
const { login, signUp, setvaultPassword } = require("../controllers");

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
