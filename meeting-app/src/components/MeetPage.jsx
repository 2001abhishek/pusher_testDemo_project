import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { disconnectMeeting } from "../api";

const MeetPage = () => {
  const [meetJoined, setMeetJoined] = useState(true);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleDisconnect = async () => {
    try {
      await disconnectMeeting();
      setMeetJoined(false);
      navigate("/profile");
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    setMeetJoined(true);
  }, []);

  return (
    <div>
      <h1>You are in meeting</h1>
      <p>Email: {email}</p>
      <p>Meet Joined: {meetJoined ? "True" : "False"}</p>
      <button onClick={handleDisconnect}>Disconnect Meet</button>
    </div>
  );
};

export default MeetPage;
