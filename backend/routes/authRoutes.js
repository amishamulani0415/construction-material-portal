import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// 📝 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  try {
    console.log("📩 Login request body:", req.body);
    let { email, password } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid credentials. Try again." });
    }

    // 2️⃣ Compare entered password with stored hash
    console.log("🔐 Stored hash:", user.password);
    console.log("🔑 Provided password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧩 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials. Try again." });
    }

    // 3️⃣ Create token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("✅ Login successful for:", user.email);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("⚠️ Login error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});


// 🔒 Verify Token & Get User
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
