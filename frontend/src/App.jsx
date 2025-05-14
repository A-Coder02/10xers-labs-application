import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";
import LayoutWrapper from "./LayoutWrapper";

const App = () => {
  return (
    <div className="px-4 py-3 h-screen overflow-auto">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Private Routes */}
          <Route path="/" element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/portal" element={<Portal />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
