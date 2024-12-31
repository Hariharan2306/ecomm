import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const url = `mongodb://localhost:27017/Hackathon`;
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
