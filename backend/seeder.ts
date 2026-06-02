import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item";
import inventory from "./data/inventory";

// Initialize environment configurations
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database bridge established.");

    await Item.deleteMany({});
    console.log("Old inventory purged.");

    await Item.insertMany(inventory);
    console.log("New 25-item inventory successfully locked in the vault.");

    process.exit(0);
  } catch (error) {
    console.error("Fatal deployment error:", error);
    process.exit(1);
  }
};

seedDatabase();
