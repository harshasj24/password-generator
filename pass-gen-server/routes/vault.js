const {
  savePasswords,
  getUserPasswords,
  updatePassword,
  getPassword,
} = require("../controllers");
const express = require("express");
const { authorizeToken } = require("../auth/auth");
const router = express.Router();

router.post("/savePasswords", authorizeToken, savePasswords);
router.get("/password/:_id", authorizeToken, getUserPasswords);
router.post("/updatePassword", authorizeToken, updatePassword);
router.get("/getPassword/:_id", authorizeToken, getPassword);

module.exports = router;
