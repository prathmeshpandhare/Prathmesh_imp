import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Menu } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/AdminDashboard";
import Deals from "./pages/Deals";
import Vans from "./pages/Vans";
import Owners from "./pages/Owners";
import Payments from "./pages/Payments";
import OwnerDashboard from "./pages/OwnerDashboard";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DriverDashboard from "./pages/DriverDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminParcelForm from "./pages/AdminParcelForm";
import TransportRecord from "./pages/TransportRecord";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // NEW
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setIsAuthChecked(true); // Ensure routes render only after auth check
  }, []);

  const role = sessionStorage.getItem("role");

  const ProtectedRoute = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" />;

  const RoleRedirect = () => {
    if (role === "admin") return <Navigate to="/admin-dashboard" />;
    if (role === "owner") return <Navigate to="/owner-dashboard" />;
    if (role === "driver") return <Navigate to="/driver-dashboard" />;
    if (role === "company") return <Navigate to="/company-dashboard" />;
    return <Navigate to="/login" />;
  };

  if (!isAuthChecked) return <div>Loading...</div>;

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && (
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <div
          className={`transition-all duration-300 flex-1 min-h-screen ${
            isAuthenticated
              ? "bg-gray-100 " +
                (isSidebarOpen ? (collapsed ? "md:ml-20" : "md:ml-64") : "ml-0")
              : ""
          }`}
        >
          {isAuthenticated && !isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="m-4 p-2 bg-white rounded-md shadow"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <div className="p-6 bg-gray-100 min-h-screen">
            {isAuthenticated && (
              <button
                className="md:hidden mb-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            <Routes>
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <RoleRedirect />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner-dashboard"
                element={
                  <ProtectedRoute>
                    {role === "owner" ? (
                      <OwnerDashboard />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-parcel-form"
                element={
                  <ProtectedRoute>
                    {role === "admin" ? (
                      <AdminParcelForm />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver-dashboard"
                element={
                  <ProtectedRoute>
                    {role === "driver" ? (
                      <DriverDashboard />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company-dashboard"
                element={
                  <ProtectedRoute>
                    {role === "company" ? (
                      <CompanyDashboard />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    {role === "admin" ? <Dashboard /> : <Navigate to="/" />}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deals"
                element={
                  <ProtectedRoute>
                    <Deals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vans"
                element={
                  <ProtectedRoute>
                    <Vans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owners"
                element={
                  <ProtectedRoute>
                    <Owners />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transport-records"
                element={
                  <ProtectedRoute>
                    <TransportRecord />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
