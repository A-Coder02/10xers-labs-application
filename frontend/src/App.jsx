import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";

const App = () => {
  return (
    <div className="px-4 py-3">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
