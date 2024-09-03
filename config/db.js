import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };

export async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}