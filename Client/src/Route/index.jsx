import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "../Page/Portfolio/Portfolio";
import SuperAdminRoutes from "./Superadmin.route";
import Login from "../Page/Login/Login";

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin_login" element={<Login />} />
        <Route path="/superadmin/*" element={<SuperAdminRoutes />} /> {/* Use /superadmin/* to match nested routes */}
      </Routes>
    </Router>
  );
}
