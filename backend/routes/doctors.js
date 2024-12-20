// routes/doctors.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Fetch all doctors and their video call status
router.get("/status", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors); // Return doctor list with their statuses
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
