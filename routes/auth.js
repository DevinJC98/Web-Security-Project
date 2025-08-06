const express = require("express");
const argon2 = require("argon2");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const xss = require("xss");

//route for registering new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, textbox, role = "user" } = req.body;

    //hash password
    const hashedPassword = await argon2.hash(password);

    //create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      textbox,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User Created Succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route for logging in

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check that the username exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Username does not exist" });

    //confirm password with argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        textbox: user.textbox,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({ message: "Login Succesful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update route
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { username, email, textbox } = req.body;

    const updatedfields = {};

    //sanitize inputs
    if (username) {
      updatedfields.username = xss(username);
    }
    if (email) {
      updatedfields.email = xss(email);
    }
    if (textbox) {
      updatedfields.textbox = xss(textbox);
    }

    //matches the user that will be updated to the current user and updates the selected fields defined in dashboard.js
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedfields },
      { new: true }
    );

    return res.status(200).json({
      message: "data updated sucessfully",
      user: updateUser,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
