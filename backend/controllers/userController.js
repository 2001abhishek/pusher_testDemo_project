const User = require("../models/User");

// Get all users with email and meet_joined status
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "email meet_joined"); // Fetch only email and meet_joined
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
