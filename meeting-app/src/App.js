import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import MeetPage from "./components/MeetPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/meet" element={<MeetPage />} />
      </Routes>
    </Router>
  );
};

export default App;
