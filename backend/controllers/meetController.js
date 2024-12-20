const User = require("../models/User");
const pusher = require("../config/pusher");

// Join meeting
exports.joinMeeting = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.meet_joined = true;
    await user.save();

    // Trigger Pusher event when a user joins the meeting
    pusher.trigger('meeting-channel', 'meet-joined', {
      message: `${user.email} has joined the meeting successfully.`,
      email: user.email,
      meet_joined: user.meet_joined
    });

    res.status(200).json({ message: "Joined meeting successfully", meet_joined: user.meet_joined });
  } catch (err) {
    console.error("Error joining meeting:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Disconnect meeting
exports.disconnectMeeting = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.meet_joined = false;
    await user.save();

    // Trigger Pusher event when a user disconnects from the meeting
    pusher.trigger('meeting-channel', 'meet-disconnected', {
      message: `${user.email} has disconnected from the meeting.`,
      email: user.email,
      meet_joined: user.meet_joined
    });

    res.status(200).json({ message: "Disconnected from meeting successfully", meet_joined: user.meet_joined });
  } catch (err) {
    console.error("Error disconnecting meeting:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
