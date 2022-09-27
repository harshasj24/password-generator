const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaultSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  pName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("vault", vaultSchema);
