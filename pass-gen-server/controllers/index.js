const usersSchema = require("../models/index");
const vaultSchema = require("../models/vault/index");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto-js");
require("dotenv").config();

// const hashPaaword = async (password) => {
//   const salt = await bcrypt.genSalt(12);
//   return await bcrypt.hash(password, salt);
// };

const encrypt = (string) => {
  const cipherText = Crypto.AES.encrypt(string, process.env.SCREACT_KEY);
  return cipherText;
};
const decrypt = (string) => {
  const bytes = Crypto.AES.decrypt(string, process.env.SCREACT_KEY);
  const originalData = bytes.toString(Crypto.enc.Utf8);
  return originalData;
};

const signUp = async (req, res, next) => {
  let { fName, lName, email, password } = req.body;
  try {
    const emailExists = await usersSchema.findOne({ email });
    if (emailExists) {
      res.status(401).json({
        error: true,
        message: "Email already exists",
        data: null,
      });
    } else {
      let saltRounds = 10;
      let salt = await bcrypt.genSalt(saltRounds);
      let hashPassword = await bcrypt.hash(password, salt);
      let userId = mongoose.Types.ObjectId();
      await usersSchema.insertMany([
        {
          _id: userId,
          email,
          fName,
          lName,
          password: hashPassword,
        },
      ]);
      res.status(200).json({
        error: false,
        message: "Registerd sucessfully",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const finduser = await usersSchema.findOne({ email });
    if (finduser) {
      const { fName, lName, email } = finduser;
      const validatePassword = await bcrypt.compare(
        password,
        finduser.password
      );

      if (validatePassword) {
        const payload = {
          fName,
          lName,
          email,
        };

        const token = jwt.sign(payload, process.env.SCREACT_KEY, {
          expiresIn: 24 * 60 * 60,
        });
        const responceData = {
          fName,
          lName,
          email,
          id: finduser._id,
          token,
        };
        res.status(200).json({
          error: false,
          message: "Login Sucessfull",
          data: responceData,
        });
      } else {
        res.status(401).json({
          error: true,
          message: "Invalid Password",
          data: null,
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "Not a registred user",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

const savePasswords = async (req, res, next) => {
  const { pName, password, _id } = req.body;
  const cipherText = encrypt(password).toString();
  try {
    const objectId = new mongoose.Types.ObjectId();
    const addedDate = new Date();
    let status;
    await vaultSchema.insertMany([
      {
        userId: _id,
        pName,
        password: cipherText,
        _id: objectId,
        date: addedDate,
        status: password.length,
      },
    ]);
    res.status(200).json({
      error: false,
      message: "Password Added",
      data: {
        _id: objectId,
        date: addedDate,
        cipherText: cipherText,
        status: password.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserPasswords = async (req, res, next) => {
  let _id = req.params._id;
  console.log("called");

  try {
    const usersPassword = await vaultSchema.find({ userId: _id }).lean();
    res.status(200).json({
      error: false,
      message: "Success",
      data: usersPassword,
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: "Invalid!",
    });
  }
};

const updatePassword = async (req, res, next) => {
  const { _id, password, pName } = req.body;
  console.log(password);
  const updatedDate = new Date();
  try {
    const cipherText = encrypt(password).toString();
    console.log(cipherText);
    await vaultSchema.updateOne(
      { _id },
      {
        $set: {
          password: cipherText,
          date: updatedDate,
          status: password.length,
          pName: pName,
        },
      }
    );
    res.status(200).json({
      error: false,
      message: "updated successfully",
      data: {
        cipherText,
        date: updatedDate,
        status: password.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const setvaultPassword = async (req, res, next) => {
  let { _id, password } = req.body;
  try {
    await usersSchema.updateOne(
      { _id },
      { $set: { valultPassword: hashPaaword(password) } }
    );
  } catch (error) {
    next(error);
  }
};

const getPassword = async (req, res, next) => {
  let _id = req.params._id;

  try {
    const onePassword = await vaultSchema.findOne({ _id });
    const decryptedPassword = decrypt(onePassword.password);
    res.status(200).json({
      error: false,
      message: "success",
      data: {
        password: decryptedPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

const validateUserPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userPassword = await usersSchema.findOne({ email }).lean();
    if (userPassword) {
      console.log(password, userPassword.password);
      const passmatch = await bcrypt.compare(password, userPassword.password);
      if (passmatch) {
        res.status(200).json({
          message: "Password Validated Sucessfully",
        });
      } else {
        res.status(401).json({
          message: "Incorrect password",
        });
      }
    } else {
      res.status(401).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteOnePassword = async (req, res, next) => {
  const _id = req.params._id;
  try {
    console.log(_id);
    await vaultSchema.deleteOne({ _id });
    res.status(200).json({
      message: "Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  savePasswords,
  setvaultPassword,
  getUserPasswords,
  updatePassword,
  getPassword,
  validateUserPassword,
  deleteOnePassword,
};
