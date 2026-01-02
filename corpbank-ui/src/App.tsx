import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import AdminDashboard from "./pages/AdminDashboard";
import RMDashboard from "./pages/RMDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";

import UserList from "./features/admin/userList";
import ClientList from "./features/clients/clientList";
import ClientDetails from "./features/clients/clientDetails";
import ClientForm from "./features/clients/clientForm";
import CreditRequestList from "./features/credit/creditRequestList";
import CreditRequestReview from "./features/credit/creditRequestReview";
import CreditRequestForm from "./features/clients/creditRequestForm";
import DashboardRedirect from "./components/DashboardRedirect";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />

      {/* ================= DASHBOARD REDIRECT ================= */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <DashboardRedirect />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardRedirect />
          </PrivateRoute>
        } 
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserList />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* ================= RM ================= */}
      <Route
        path="/rm"
        element={
          <PrivateRoute>
            <RoleRoute roles={["RM"]}>
              <RMDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="clients" replace />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/new" element={<ClientForm />} />
        <Route path="clients/:id" element={<ClientDetails />} />
        <Route path="credit-requests" element={<CreditRequestList />} />
        <Route path="credit-requests/new" element={<CreditRequestForm />} />
      </Route>

      {/* ================= ANALYST ================= */}
      <Route
        path="/analyst"
        element={
          <PrivateRoute>
            <RoleRoute roles={["ANALYST"]}>
              <AnalystDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="credit-requests" replace />} />
        <Route path="credit-requests" element={<CreditRequestList />} />
        <Route
          path="credit-requests/:id"
          element={<CreditRequestReview />}
        />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
