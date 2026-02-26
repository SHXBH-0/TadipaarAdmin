import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* 🔷 Pages */
import Login from "./pages/Login";
import DashboardHome from "./AdminDashboard/DashboardHome";
import OfficersScreen from "./AdminDashboard/OfficersScreen";
import CriminalsScreen from "./AdminDashboard/CriminalsScreen";
import RestrictedAreasScreen from "./AdminDashboard/RestrictedAreasScreen";
import TadipaarTrackingScreen from "./AdminDashboard/TadipaarTrackingScreen";
import Profile from "./AdminDashboard/Profile";
import CriminalDashboard from "./pages/CriminalDashboard";
import StationAdminPreview from "./pages/StationAdminPreview"; 
import OverSightDashboard from "./pages/OverSightDashboard";

/* 🔷 Layout */
import Sidebar from "./components/Sidebar";

/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If criminal is logged in, don't let them see admin sidebar
    if (user.role === 'CRIMINAL') return <Navigate to="/my-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

/* ================= APP ================= */

export default function App() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  return (
    <Router>
      <Routes>
        {/* 🔓 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 👮 CRIMINAL DASHBOARD (No Sidebar) */}
        <Route 
          path="/my-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["CRIMINAL"]}>
              <CriminalDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 🔐 PROTECTED ADMIN APP */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRoles={["DCP", "ACP", "STATION_ADMIN"]}>
              <div className="flex bg-[#F4F6F9] min-h-screen">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <main
                  className={`flex-1 transition-all duration-300 ${
                    collapsed ? "ml-20" : "ml-64"
                  }`}
                >
                  <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route
                      path="/officers"
                      element={
                        <ProtectedRoute allowedRoles={["DCP", "ACP"]}>
                          <OfficersScreen />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/criminals" element={<CriminalsScreen />} />
                    <Route path="/restricted-areas" element={<RestrictedAreasScreen />} />
                    <Route path="/tadipaar-tracking" element={<TadipaarTrackingScreen />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/oversight-dashboard" element={<OverSightDashboard />} />
        <Route path="/station-tracking" element={<StationAdminPreview />} />
        
      </Routes>
    </Router>
  );
}