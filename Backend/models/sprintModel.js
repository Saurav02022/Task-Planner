const mongoose = require("mongoose");

const sprintSchema = mongoose.Schema({
  sprintName: String,
  creatorId: String,
});

const sprintModel = mongoose.model("sprint", sprintSchema);

module.exports = {
  sprintModel,
};
