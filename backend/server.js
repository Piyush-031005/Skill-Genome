import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js"; // ✅ NEW

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// auth routes (OLD — KEEP SAME)
app.use("/api/auth", authRoutes);

// ✅ NEW: Resume Analyzer Route
app.use("/api/resume", resumeRoutes);

// server start
app.listen(8000, () => {
  console.log("🚀 Server running on port 8000");
});

// google test route (OLD — KEEP SAME)
app.post("/api/auth/google", async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    console.log("Google user:", name, email);

    return res.json({
      message: "User saved",
      user: { name, email, photo }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});