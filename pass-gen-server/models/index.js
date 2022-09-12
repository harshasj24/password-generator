const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  fName: { type: String, requird: true },
  lName: { type: String, requird: true },
  email: { type: String, requird: true },
  password: { type: String, requird: true },
  valultPassword: { type: String },
});

module.exports = mongoose.model("users", usersSchema);
