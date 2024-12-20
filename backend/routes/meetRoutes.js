const express = require("express");
const { joinMeeting, disconnectMeeting } = require("../controllers/meetController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/join", authMiddleware, joinMeeting);
router.post("/disconnect", authMiddleware, disconnectMeeting);

module.exports = router;
