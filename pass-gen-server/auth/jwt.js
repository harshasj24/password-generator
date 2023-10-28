const JWT = require("jsonwebtoken");
const SCREACT_KEY = process.env.SCREACT_KEY;

require("dotenv").config();

const tokenConfig = {
  expiresIn: 24 * 60 * 60,
};
const createToken = (payload) => {
  try {
    const token = JWT.sign(payload, SCREACT_KEY, tokenConfig);
    return token;
  } catch (error) {
    return null;
  }
};

const verifyToken = (request) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    if (token) {
      const payload = JWT.verify(token, SCREACT_KEY);
      return payload;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// const getToken = (req) => {
//   try {
//     return req.headers["authorization"].split(" ")[0];
//   } catch (error) {
//     return null;
//   }
// };
module.exports = { createToken, verifyToken };
