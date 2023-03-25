const express = require("express");

const sprintRouter = express.Router();

const { sprintModel } = require("../models/sprintModel");

//create a new sprint
sprintRouter.post("/create", async (req, res) => {
  const { sprintName, creatorId } = req.body;

  const validateSprintName = await sprintModel.find({
    sprintName: sprintName,
    creatorId: creatorId,
  });

  try {
    if (sprintName && creatorId) {
      if (validateSprintName.length > 0) {
        res.send({
          message: "already sprint exists",
        });
      } else {
        const newSprint = new sprintModel({
          sprintName,
          creatorId,
        });

        await newSprint.save();

        res.send({
          message: "new sprint created successfully",
        });
      }
    } else {
      res.send({
        message: "Please all required field",
      });
    }
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

// read all sprintName data using userId
sprintRouter.get("/:creatorId", async (req, res) => {
  const { creatorId } = req.params;
  try {
    const databyCreatorId = await sprintModel.find({ creatorId: creatorId });

    res.send(databyCreatorId);
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

// read all sprintName data
sprintRouter.get("/", async (req, res) => {
  try {
    const sprintData = await sprintModel.find();

    res.send(sprintData);
  } catch (e) {
    res.send({
      message: e.message,
    });
  }
});

module.exports = {
  sprintRouter,
};
