import React from "react";
import { useNavigate } from "react-router-dom";
import { joinMeeting, disconnectMeeting } from "../api";

const ProfilePage = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleJoinMeet = async () => {
    try {
      await joinMeeting();
      navigate("/meet");
    } catch (error) {
      console.error("Error joining meeting:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <button onClick={handleJoinMeet}>Join Meet</button>
    </div>
  );
};

export default ProfilePage;
