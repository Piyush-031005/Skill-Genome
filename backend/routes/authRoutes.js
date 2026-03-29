import express from "express";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
});

// 🔥 LeetCode API
router.get("/leetcode/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }`,
        variables: { username },
      }),
    });

    const data = await response.json();

    res.json(data.data.matchedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
});

router.post("/save-score", async (req, res) => {
  try {
    const { leetcodeId, score } = req.body;

    let user = await User.findOne({ leetcodeId });

    if (!user) {
      user = new User({
        name: leetcodeId,
        email: leetcodeId + "@temp.com",
        password: "123456",
        leetcodeId,
        score
      });
    } else {
      user.score = score;
    }

    await user.save();

    res.json({ message: "Score saved" });

  } catch (error) {
    res.status(500).json({ message: "Error saving score" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;