const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorizeToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(404).json({
      error: true,
      message: "Authorization Token Required",
      data: null,
    });
  }
  const token = req.headers["authorization"].split(" ")[1];
  try {
    jwt.verify(token, process.env.SCREACT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Failed to authorize token",
    });
  }
};

module.exports = { authorizeToken };
