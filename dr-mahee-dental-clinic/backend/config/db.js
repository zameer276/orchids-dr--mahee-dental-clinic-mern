const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If no external MongoDB URI or it's the default placeholder, use in-memory server
    if (!uri || uri.includes('your_mongodb') || uri.includes('localhost')) {
      console.log('Starting in-memory MongoDB server...');
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log(`In-memory MongoDB URI: ${uri}`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
