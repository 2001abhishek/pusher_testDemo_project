import React, { createContext, useState, useEffect } from "react";
import Pusher from "pusher-js";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("4a3cd9acdccac3af6870", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("meeting-channel");

    channel.bind("meet-joined", (data) => {
      setNotifications((prev) => [
        { id: Date.now(), message: `${data.email} joined the meeting`, type: "success" },
        ...prev,
      ]);
    });

    channel.bind("meet-disconnected", (data) => {
      setNotifications((prev) => [
        { id: Date.now(), message: `${data.email} left the meeting`, type: "destructive" },
        ...prev,
      ]);
    });

    return () => {
      pusher.unsubscribe("meeting-channel");
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
