import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberList from "./components/MemberList";
import RecordList from "./pages/RcordList";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Profile from "./pages/dependant/Profile";

import { PusherProvider } from "./context/PusherContext";

const App = () => {
  return (
    <PusherProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/records" element={<RecordList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </PusherProvider>
  );
};

export default App;
