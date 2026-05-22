const mongoose = require("mongoose");

// Inventory Blueprint
const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Stored as strict Number so the server can calculate totals later
    required: true,
  },
  stock: {
    type: Number, // Injects our new inventory tracking integer
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
