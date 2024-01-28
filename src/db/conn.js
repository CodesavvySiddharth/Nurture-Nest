const mongoose = require("mongoose");

const connectionStr = 'mongodb://localhost:27017/NurtureNest'; // Replace with your actual connection string

mongoose.connect(connectionStr)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
