const mongoose = require('mongoose');
require('dotenv').config();

const Item = require('./models/Item');
const inventory = require('./data/inventory');

const seedDatabase = async () => {
  try {
    // Establish  connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database bridge established.');

    // Clear the zone
    await Item.deleteMany({});
    console.log('Old inventory purged.');

    // Drop the payload
    await Item.insertMany(inventory);
    console.log('New 25-item inventory successfully locked in the vault.');

    // Sever the connection
    process.exit(0);

  } catch (error) {
    console.error('Fatal deployment error:', error);
    process.exit(1); 
  }
};

seedDatabase();