const mongoose = require("mongoose");

require("dotenv").config();

const config = mongoose.connect(process.env.mongooseUrl);

module.exports = {
  config,
};