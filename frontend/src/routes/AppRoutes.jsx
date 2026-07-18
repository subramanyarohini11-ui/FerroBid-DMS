import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import AdminLogin from "../pages/Login/AdminLogin";
import SubadminLogin from "../pages/Login/SubadminLogin";
import OperationsLogin from "../pages/Login/OperationsLogin";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import OperationsDashboard from "../pages/Dashboard/OperationsDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/subadmin-login" element={<SubadminLogin />} />
      <Route path="/operations-login" element={<OperationsLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Operations Executive dashboard */}
      <Route
        path="/operations-dashboard"
        element={<OperationsDashboard />}
      />
    </Routes>
  );
}

export default AppRoutes;