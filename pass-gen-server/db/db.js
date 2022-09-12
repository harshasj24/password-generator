const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://Harsha_sj:harsha@cluster0.3ba50.mongodb.net/passwordGenApp?retryWrites=true&w=majority";

// db connection

const dbConnection = mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("DB Connected");
  }
);
module.exports = { dbConnection };
