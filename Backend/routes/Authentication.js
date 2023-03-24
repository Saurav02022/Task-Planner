const express = require("express");

const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

const { userModel } = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName && email && password && lastName) {
    const validateEmail = await userModel.findOne({ email: email });

    if (validateEmail) {
      res.send({
        message: "already registred user Please Login",
      });
    } else {
      try {
        bcrypt.hash(password, 10, async (err, hash_password) => {
          if (err) {
            res.send({
              message: err.message,
            });
          } else {
            const newRegistration = new userModel({
              firstName,
              lastName,
              email,
              password: hash_password,
            });

            await newRegistration.save();

            await res.send({
              message: "new registration successfully",
            });
          }
        });
      } catch (err) {
        res.send({
          message: err.message,
        });
      }
    }
  } else {
    res.send({
      message: "Please fill the required fields",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await userModel.find({ email });
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user[0]._id }, "masai");
            res.send({
              userId: user[0]._id,
              message: "Login successfully",
              token,
              firstName: user[0].firstName,
            });
          } else {
            res.send({
              message: "Wrong Password",
            });
          }
        });
      } else {
        res.send({
          message: "Email Address not found",
        });
      }
    } catch (err) {
      res.send({
        message: err.message,
      });
    }
  } else {
    res.send({
      message: "Please fill the required fields",
    });
  }
});

userRouter.get("/", async (req, res) => {
  const query = req.query._limit;
  const pages = req.query._page;
  try {
    const users = await userModel
      .find()
      .limit(query)
      .skip((pages - 1) * query);
    res.send(users);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const users = await userModel.find({ _id: id });
    res.send(users);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete({ _id: id });
    res.send("user deleted successfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  userRouter,
};
