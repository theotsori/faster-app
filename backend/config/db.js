const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * 
 * This function checks for the presence of the MONGO_URI environment variable,
 * attempts to connect to the database, and handles any errors that occur during
 * the connection process.
 */
const connectDB = async () => {
  // Check if MONGO_URI is defined in environment variables
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not defined in environment variables');
    process.exit(1);
  }

  try {
    // Attempt to connect to MongoDB with specified options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    // Log the error message and exit the process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;