const express = require("express");
const argon2 = require("argon2");
const User = require("../models/User");
const router = express.Router();

//route for registering new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    //hash password
    const hashedPassword = await argon2.hash(password);

    //create user
    const newUser = new User({ username, password: hashedPassword });
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

    res.status(200).json({ message: "Login Succesful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
