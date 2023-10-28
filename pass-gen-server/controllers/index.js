const usersSchema = require("../models/index");
const vaultSchema = require("../models/vault/index");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto-js");
require("dotenv").config();
const { makePassword, comparePassword } = require("../auth/hasers");
const { createToken, verifyToken } = require("../auth/jwt");
const { todayDate } = require("../constants/constants");
const { encrypt, decrypt } = require("../auth/crypto");
const User = require("../db/user.mongo");
const Vault = require("../db/vault.mongo");

// ------------------------user logic starts------------------------------------------
// user/signup
const signUp = async (req, res, next) => {
  let { fName, lName, email, password } = req.body;
  try {
    const currentUser = await User.find({ email });
    if (currentUser) {
      res.forbidden("Email already exists");
    } else {
      let hashPassword = await makePassword(password);
      let userId = mongoose.Types.ObjectId();
      const newUser = await User.create({
        _id: userId,
        email,
        fName,
        lName,
        password: hashPassword,
      });
      if (newUser) {
        res.ok("Registerd sucessfully");
      }
    }
  } catch (error) {
    next(error);
  }
};

// user/Login
const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const finduser = await User.find({ email });
    if (finduser) {
      const { fName, lName, email } = finduser;
      const validatePassword = await comparePassword(
        password,
        finduser.password
      );
      if (validatePassword) {
        const payload = {
          fName,
          lName,
          email,
        };
        const token = createToken(payload);
        const responceData = {
          fName,
          lName,
          email,
          id: finduser._id,
          token,
        };
        res.ok("Login Sucessfull", responceData);
      } else {
        res.forbidden("Invalid Password");
      }
    } else {
      res.notFound("Not a registred user");
    }
  } catch (error) {
    next(error);
  }
};

// -----------------vault logic starts-------------------------------------------

// save password to data base
// /vault/savePasswords
const savePasswords = async (req, res, next) => {
  const { pName, password, _id } = req.body;
  const cipherText = encrypt(password).toString();
  try {
    const objectId = new mongoose.Types.ObjectId();
    const addedDate = new Date();
    let status;
    await Vault.create({
      userId: _id,
      pName,
      password: cipherText,
      _id: objectId,
      date: addedDate,
      status: password.length,
    });
    res.ok("Password Added", {
      _id: objectId,
      date: addedDate,
      cipherText: cipherText,
      status: password.length,
    });
  } catch (error) {
    next(error);
  }
};

// /vault/password/
const getUserPasswords = async (req, res, next) => {
  let _id = req.params._id;
  try {
    // const usersPassword = await vaultSchema.find({ userId: _id }).lean();
    const usersPassword = await Vault.findAll({ userId: _id });
    res.ok("Success", usersPassword);
  } catch (error) {
    res.notFound("oops! Something went wrong");
  }
};

// /vault/updatePassword/
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

// /vault/password/:_id
const getPassword = async (req, res, next) => {
  let _id = req.params._id;

  try {
    const onePassword = await Vault.findOne({ _id });
    const decryptedPassword = decrypt(onePassword.password);
    // res.status(200).json({
    //   error: false,
    //   message: "success",
    //   data: {
    //     password: decryptedPassword,
    //   },
    // });
    res.ok("success", {
      password: decryptedPassword,
    });
  } catch (error) {
    next(error);
  }
};

let invalidCount = 0;

const validateUserPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const tokenPayload = verifyToken(req);
  console.log(tokenPayload);
  // return;
  try {
    const user = await User.find({ email: email || tokenPayload.email });
    const userAuthentication = user.authentication;
    if (user) {
      console.log(password, user.password);
      const passmatch = await bcrypt.compare(password, user.password);
      if (passmatch) {
        if (!userAuthentication.isBlocked) {
          User.resetAuthentication(
            { email: email || tokenPayload.email },
            "all"
          );
        }
        res.status(200).json({
          message: "Password Validated Sucessfully",
        });
      } else {
        if (
          userAuthentication.invalidCount >= 3 &&
          !userAuthentication.isBlocked
        ) {
          const blocked = User.blockUser({
            email: email || tokenPayload.email,
          });
          return res.unauthorized("you are blocked", {
            isBloced: true,
            blockedTill: blocked.blockedTill,
          });
        }
        User.incrementInvalidCount({ email: email || tokenPayload.email });
        res.status(401).json({
          message: "Incorrect password",
          userAuthentication,
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
    await Vault.deleteOne({ _id });
    res.ok("Deleted Sucessfully");
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
