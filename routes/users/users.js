"use strict";

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Users = mongoose.model("user", userSchema);

module.exports = async (fastify, options) => {
  // USERS TEST ROUTE
  fastify.get("/", async (req, res) => {
    try {
      let allUsers = await Users.find().select("-password");

      res.send({
        allUsers,
      });
    } catch (error) {
      res.send(error);
    }
  });

  // USER SIGNUP
  fastify.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if ((!name, !email, !password)) {
        return res.json({
          status: false,
          message: "Please enter all details",
        });
      }

      // HASHING PASSWORD
      const hashedPassword = await fastify.bcrypt
        .hash(password)
        .then((hash) => {
          return hash;
        });
      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.send({
        status: true,
        message: "Account Created",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        message: "Error Occured",
      });
    }
  });

  // USER LOGIN
  fastify.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.send({ message: "No user found" });
    }
    const matchPassword = await fastify.bcrypt
      .compare(password, findUser.password)
      .then((match) => {
        return match;
      });
    if (!matchPassword) {
      return res.send({ message: "Password doesnot match" });
    }

    res.send({
      message: "User Logged in",
    });
  });
};
