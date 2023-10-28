const jwt = require("jsonwebtoken");
const usersSchema = require("../../models/index");
require("dotenv").config();
const User = require("../../db/user.mongo");
const { todayDate } = require("../../constants/constants");
const authorizeToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(404).json({
      error: true,
      message: "Authorization Token Required",
      data: null,
    });
  }
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SCREACT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Failed to authorize token",
    });
  }
};

const authorize = async (req, res, next) => {
  console.log(req.headers["authorization"].split(" "));
  const token = req.headers["authorization"].split(" ")[1];
  const payload = jwt.verify(token, process.env.SCREACT_KEY);
  const user = await usersSchema.findOne({ email: payload?.email });
  const checkValidity = todayDate >= new Date(user.authentication.blockedTill);
  if (!user.authentication.isBlocked) {
    User.resetAuthentication({ email: user.email }, "all");
    return next();
  }

  return res.unauthorized({
    message: "you are blocked till " + user.authentication.blockedTill,
  });
};

module.exports = { authorizeToken, authorize };
