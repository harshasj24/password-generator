const bcryptjs = require("bcryptjs");

const makePassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashPaaword = await bcryptjs.hash(password, salt);
    return hashPaaword;
  } catch (error) {
    return false;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcryptjs.compare(password, hashedPassword);
  } catch (error) {
    return false;
  }
};

module.exports = { makePassword, comparePassword };
