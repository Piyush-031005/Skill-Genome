const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

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