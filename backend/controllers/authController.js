import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; // In production, use environment variable

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'student' });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      message: "User registered successfully", 
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (email === "admin@gmail.com" && password === "admin") {
    const token = jwt.sign({ userId: "admin", role: "admin" }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ 
      role: "admin", 
      email, 
      name: "Admin",
      message: "Admin login successful",
      token
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      role: "student", 
      name: user.name, 
      email: user.email, 
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
