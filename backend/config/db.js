import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.cblaqxy.mongodb.net/skillgenome?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected");

  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;