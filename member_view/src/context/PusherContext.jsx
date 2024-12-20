// context/PusherContext.jsx
import React, { createContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PusherContext = createContext();

export const PusherProvider = ({ children }) => {
  const [pusher] = useState(
    new Pusher("4a3cd9acdccac3af6870", {
      cluster: "ap2",
      encrypted: true,
    })
  );

  useEffect(() => {
    const handleEvent = (eventName, data, messageType) => {
      const message = (
        <div>
          <p>
            {data.email} {eventName === "meet-joined" ? "joined" : "left"} the meeting
          </p>
          {eventName === "meet-joined" && (
            <a
              href="http://localhost:3001/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to join
            </a>
          )}
        </div>
      );

      toast[messageType](message);
    };

    const meetingChannel = pusher.subscribe("meeting-channel");

    meetingChannel.bind("meet-joined", (data) =>
      handleEvent("meet-joined", data, "success")
    );

    meetingChannel.bind("meet-disconnected", (data) =>
      handleEvent("meet-disconnected", data, "error")
    );

    return () => {
      meetingChannel.unbind_all();
      meetingChannel.unsubscribe();
    };
  }, [pusher]);

  return (
    <PusherContext.Provider value={pusher}>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </PusherContext.Provider>
  );
};
