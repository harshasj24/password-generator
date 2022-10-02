const {
  savePasswords,
  getUserPasswords,
  updatePassword,
  getPassword,
  deleteOnePassword,
} = require("../controllers");
const express = require("express");
const { authorizeToken } = require("../auth/auth");
const router = express.Router();
// vault
router.get("/password/:_id", authorizeToken, getUserPasswords);
router.get("/getPassword/:_id", authorizeToken, getPassword);
router.post("/savePasswords", authorizeToken, savePasswords);
router.put("/updatePassword", authorizeToken, updatePassword);
router.delete("/delete/:_id", authorizeToken, deleteOnePassword);

module.exports = router;
