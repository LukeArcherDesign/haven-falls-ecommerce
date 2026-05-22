const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Ensure this path points to your User.js model

/* ---------------------------- REGISTER ROUTE ---------------------------- */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already in vault
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An adventurer with this email already exists." });
    }

    // Hash password (Scramble it)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save to MongoDB
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Keeps them logged in for 7 days
    );

    // Send the token and user data back to React frontend
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server encountered a storm. Try again." });
  }
});

/* ---------------------------- LOGIN ROUTE ---------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if adventurer exists in vault
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Adventurer not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Incorrect password." });
    }

    // Generate VIP Wristband (JWT)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Keeps them logged in for 7 days
    );

    // Send token and user data back to React frontend
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Server encountered a storm during login." });
  }
});

/* ---------------------------- SYNC CAMPFIRE ROUTE ---------------------------- */
router.post("/campfire/sync", async (req, res) => {
  try {
    // Look for the wristband in the headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid wristband." });
    }

    // Extract actual token string
    const token = authHeader.split(" ")[1];

    // Mathematically verify token using key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find adventurer in database using ID hidden inside token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Adventurer not found." });
    }

    // Update pocket with the incoming array of items
    user.campfire = req.body.campfireList;
    await user.save();

    res.status(200).json({ message: "Campfire securely saved to the vault." });
  } catch (error) {
    console.error("Campfire sync error:", error);
    res
      .status(401)
      .json({ message: "Server storm: Invalid or expired wristband." });
  }
});

/* ---------------------------- RETRIEVE CAMPFIRE ROUTE ---------------------------- */
router.get("/campfire/sync", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid wristband." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Adventurer not found." });
    }

    res.status(200).json({ campfireList: user.campfire });
  } catch (error) {
    console.error("Campfire retrieval error:", error);
    res
      .status(401)
      .json({ message: "Server storm: Invalid or expired wristband." });
  }
});

/* ---------------------------- UPDATE USERNAME ROUTE ---------------------------- */
router.put("/profile/name", async (req, res) => {
  try {
    // 1. Verify the VIP Wristband (Security Gate)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid wristband." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Extract the new name from the React frontend payload
    const { newName } = req.body;

    // Safety check: Prevent empty names
    if (!newName || newName.trim() === "") {
      return res.status(400).json({ message: "Username cannot be empty." });
    }

    // 3. Find the user and execute the Update
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name: newName },
      { new: true }, // CRITICAL: Forces MongoDB to return the newly updated data, not the old data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Adventurer not found." });
    }

    // 4. Send the updated data back to React so the UI changes instantly
    res.status(200).json({
      message: "Username successfully updated.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ message: "Server encountered a storm during update." });
  }
});

/* ---------------------------- RETRIEVE PROFILE ROUTE ---------------------------- */
router.get("/profile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid wristband." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Adventurer not found." });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile retrieval error:", error);
    res
      .status(401)
      .json({ message: "Server storm: Invalid or expired wristband." });
  }
});

module.exports = router;
