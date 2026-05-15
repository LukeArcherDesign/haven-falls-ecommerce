const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Database translator
require("dotenv").config();
const Item = require("./models/Item");
const path = require("path");
const authRoutes = require('./auth'); 

const Contact = require("./models/Contact");

const app = express();

/* --- SECURITY PIPELINE --- */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

/* --- DATABASE CONNECTION --- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("Basecamp secured: MongoDB filing cabinet is online."),
  )
  .catch((err) => console.error("Filing cabinet locked. Access denied:", err));

/* --- ROUTES --- */
// Authentication Pipeline
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Haven Falls Basecamp Server is active.");
});

/* ---------------------------- INVENTORY EXPORT ---------------------------- */
app.get("/api/items", async (req, res) => {
  try {
    // Database Retrieval
    const items = await Item.find({});

    // Transmission
    res.status(200).json(items);
  } catch (error) {
    console.error("Inventory retrieval failed:", error);
    res
      .status(500)
      .json({ message: "Server failed to pull inventory from the vault." });
  }
});

/* ---------------------------- SINGLE ITEM EXPORT ---------------------------- */
app.get("/api/items/:id", async (req, res) => {
  try {
    const targetId = req.params.id;
    const item = await Item.findOne({ id: targetId });

    if (!item) {
      return res.status(404).json({ message: "Item not found in basecamp." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Single item retrieval failed:", error);
    res
      .status(500)
      .json({ message: "Server failed to pull the specific item." });
  }
});

/* ---------------------------- CONTACT RECEIVER ---------------------------- */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("\n--- INCOMING TRANSMISSION ---");
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("-----------------------------\n");

    const newTransmission = new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    await newTransmission.save();

    res.status(200).json({
      status: "success",
      message: "Transmission successfully locked in the basecamp vault.",
    });
  } catch (error) {
    console.error("Filing error:", error);
    res.status(500).json({
      status: "error",
      message: "Server failed to lock the transmission.",
    });
  }
});

/* ---------------------------- DEPLOYMENT MIDDLEWARE ---------------------------- */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Transmission relay established on port ${PORT}`);
});