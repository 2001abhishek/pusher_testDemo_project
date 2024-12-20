import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserMeetStatus } from "../api/api";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";

const MemberList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    const pusher = new Pusher("4a3cd9acdccac3af6870", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("meeting-channel");

    channel.bind("meet-joined", (data) => {
      setMembers((prev) =>
        prev.map((member) =>
          member.email === data.email ? { ...member, meet_joined: true } : member
        )
      );
    });

    channel.bind("meet-disconnected", (data) => {
      setMembers((prev) =>
        prev.map((member) =>
          member.email === data.email ? { ...member, meet_joined: false } : member
        )
      );
    });

    return () => {
      pusher.unsubscribe("meeting-channel");
    };
  }, []);

  const handleButtonClick = async (email, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      await updateUserMeetStatus(email, newStatus);
      setMembers((prev) =>
        prev.map((member) =>
          member.email === email ? { ...member, meet_joined: newStatus } : member
        )
      );
     
    } catch (err) {
      console.error("Failed to update member status:", err);
      setError("Failed to update member status. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Member View</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Meet Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{member.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleButtonClick(member.email, member.meet_joined)}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      member.meet_joined
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.meet_joined ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate("/records")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Record List
        </button>
      </div>
    </div>
  );
};

export default MemberList;
