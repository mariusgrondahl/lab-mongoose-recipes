const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "You must provide a username"]
  },

  password: {
    type: String,
    required: [true, "You need to enter a password"]
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;