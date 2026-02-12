const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();

    const exists = await User.findOne({ email: sanitizedEmail });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }


    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (adminExists) {
        return res.status(400).json({ message: "Admin account already exists" });
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashed,
      role,
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      token: generateToken(user._id, user.role),
      user: userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    res.status(500).json({ 
      message: "Registration failed. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sanitizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: sanitizedEmail }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({
      token: generateToken(user._id, user.role),
      user: userResponse,
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    console.error("Stack:", error.stack);
    
    res.status(500).json({ 
      message: "Login failed. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};

exports.checkAdminExists = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: "admin" });
    res.json({ exists: adminCount > 0 });
  } catch (error) {
    console.error("Check Admin Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
