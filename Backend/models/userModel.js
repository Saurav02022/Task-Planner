const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  allSprints: Array,
  assignTasks: Array,
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
