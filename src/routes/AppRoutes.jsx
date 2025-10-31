import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Dashboard from "../features/dashboard/Dashboard";
import OTPVerification from "../features/auth/OTPVerification";

export default function AppRoutes() {
  const pendingUser = JSON.parse(localStorage.getItem("pendingUser") || "[]");
  console.log("pendingUser", pendingUser);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/otp" element={<OTPVerification />} />
    </Routes>
  );
}
