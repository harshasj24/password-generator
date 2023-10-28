const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  fName: { type: String, requird: true },
  lName: { type: String, requird: true },
  email: { type: String, requird: true },
  password: { type: String, requird: true },

  valultPassword: { type: String },
  authentication: {
    invalidCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedTill: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model("users", usersSchema);
