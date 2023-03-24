const express = require("express");

const app = express();

const cors = require("cors");

const { userRouter } = require("./routes/Authentication");

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);

require("dotenv").config();

const { config } = require("./configs/db");

app.get("/", (req, res) => {
  res.send("Welcome to the task planner application");
});

app.listen(process.env.port, async () => {
  try {
    await config;
    console.log(`Server started on port ${process.env.port}`);
    console.log("Connect to mongoose server");
  } catch (e) {
    console.error(e);
  }
});
