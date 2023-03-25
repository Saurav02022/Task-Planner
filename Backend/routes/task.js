const express = require("express");

const taskRouter = express.Router();

const { taskModel } = require("../models/taskModel");
const { sprintModel } = require("../models/sprintModel");

//create a new task
taskRouter.post("/create", async (req, res) => {
  const { taskType, sprintName, task, statusOfTask, creatorId } = req.body;

  const alreadyTask = await taskModel.find({
    $and: [
      { task: task },
      { creatorId: creatorId },
      { sprintName: sprintName },
    ],
  });
  const isSprintNameExists = await sprintModel.find({
    $and: [{ sprintName: sprintName }, { creatorId: creatorId }],
  });
  try {
    if (taskType && sprintName && task && statusOfTask && creatorId) {
      if (isSprintNameExists.length > 0) {
        if (alreadyTask.length > 0) {
          res.send({
            message: "already task exists",
          });
        } else {
          const newTask = new taskModel({
            taskType,
            sprintName,
            task,
            statusOfTask,
            creatorId,
          });
          await newTask.save();

          res.send({
            message: "new task created successfully",
          });
        }
      } else {
        res.send({
          message: "Sprint Name does not exists",
        });
      }
    } else {
      res.send({
        message: "Please fill all fields",
      });
    }
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

//read all taskData through userId
taskRouter.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const taskData = await taskModel.find({ creatorId: userid });
    res.send(taskData);
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

//read taskData using userId and sprintName
taskRouter.get(
  "/allTaskBySprintName/:sprintName/:creatorId",
  async (req, res) => {
    const { sprintName, creatorId } = req.params;
    try {
      const isSprintExists = await sprintModel.find({
        $and: [{ sprintName: sprintName }, { creatorId: creatorId }],
      });

      const taskData = await taskModel.find({
        $and: [{ sprintName: sprintName }, { creatorId: creatorId }],
      });

      if (isSprintExists.length > 0) {
        if (taskData.length > 0) {
          res.send({
            message: "task data",
            data: taskData,
          });
        } else {
          res.send({
            message: "task data does not exists",
            data: [],
          });
        }
      } else {
        res.send({
          message: "sprint Name does not exists",
          data: [],
        });
      }
    } catch (e) {
      res.send({
        message: e.message,
      });
    }
  }
);

//update statusofTask value
taskRouter.patch("/updateStatusofTask/:id/:changeValue", async (req, res) => {
  const { id, changeValue } = req.params;

  try {
    await taskModel.findByIdAndUpdate(
      { _id: id },
      { statusOfTask: changeValue }
    );
    res.send({
      message: "change status successfully",
    });
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

// delete a particular task
taskRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteParticularTask = await taskModel.findOneAndDelete({ _id: id });

    res.send({
      message: "task deleted successfully",
    });
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

// read all tasks Data
taskRouter.get("/", async (req, res) => {
  try {
    const taskData = await taskModel.find();
    res.send(taskData);
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

module.exports = {
  taskRouter,
};
