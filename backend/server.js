import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import mockTestRoutes from "./routes/mockTestRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://skill-genomex.vercel.app",
  /\.vercel\.app$/   // 🔥 sab preview links allow
],
  credentials: true
}));

// middleware
app.use(express.json());

// database connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ✅ ROUTES (ORDER IMPORTANT)

// mock test route
app.use("/api/mocktest", mockTestRoutes);

// auth routes
app.use("/api/auth", authRoutes);

// resume routes
app.use("/api/resume", resumeRoutes);

// google test route
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

// server start
app.listen(8000, () => {
  console.log("🚀 Server running on port 8000");
});