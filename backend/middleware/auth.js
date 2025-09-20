import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "your-secret-key"; // In production, use environment variable

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Handle admin user (special case)
    if (decoded.userId === "admin") {
      req.user = {
        id: "admin",
        role: "admin",
        name: "Admin",
        email: "admin@gmail.com"
      };
      return next();
    }
    
    // Handle regular users
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
