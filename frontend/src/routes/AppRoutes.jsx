// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import AdminLogin from "../pages/Login/AdminLogin";
import SubadminLogin from "../pages/Login/SubadminLogin";
import OperationsLogin from "../pages/Login/OperationsLogin";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import OperationsDashboard from "../pages/Dashboard/OperationsDashboard";
import SubAdminDashboard from "../pages/Dashboard/SubAdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/subadmin-login" element={<SubadminLogin />} />
      <Route path="/operations-login" element={<OperationsLogin />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/operations-dashboard" element={<OperationsDashboard />} />

      {/* Subadmin: catch all /subadmin/* */}
      <Route path="/subadmin/*" element={<SubAdminDashboard />} />

      {/* Optional: global 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;