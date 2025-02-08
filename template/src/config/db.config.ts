import mongoose from "mongoose";

import envConfig from "./env.config.js";
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.info("MongoDB is already connected.");
    return;
  }
  try {
    await mongoose.connect(envConfig.DB_URI);
    console.log("Connected to MongoDB");
    console.info("Connected to MongoDB");

    mongoose.connection.on("disconnected", () => {
      console.log("Lost MongoDB connection");
      console.warn("Lost MongoDB connection");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Reconnected to MongoDB");
      console.info("Reconnected to MongoDB");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
