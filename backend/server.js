import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

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

// auth routes
app.use("/api/auth", authRoutes);

// server start
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

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