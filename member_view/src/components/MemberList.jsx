import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/api";
import Pusher from "pusher-js";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch users
    const fetchMembers = async () => {
      try {
        const data = await getAllUsers();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch members. Please try again later.");
        setLoading(false);
      }
    };

    fetchMembers();

    // Set up Pusher to listen for meet-joined and meet-disconnected events
    const pusher = new Pusher("4a3cd9acdccac3af6870", {
      cluster: "ap2",
      encrypted: true
    });

    const channel = pusher.subscribe("meeting-channel");

    channel.bind("meet-joined", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    channel.bind("meet-disconnected", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => {
      pusher.unsubscribe("meeting-channel");
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Member View</h1>
      {notifications.length > 0 && (
        <div className="notifications">
          <h3>Notifications:</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Meet Joined</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.email}</td>
              <td>{member.meet_joined ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
