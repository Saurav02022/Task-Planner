const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskType: String,
  sprintName: String,
  task: String,
  statusOfTask: String,
  creatorId: String,
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = {
  taskModel,
};
