// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./auth/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import RoleRoute from "./components/RoleRoute";

// import RMDashboard from "./pages/RMDashboard";
// import AnalystDashboard from "./pages/AnalystDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

// export default function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/login" element={<Login />} />

//       {/* RM Dashboard */}
//       <Route
//         path="/rm/*"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["RM"]}>
//               <RMDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       />

//       {/* Analyst Dashboard */}
//       <Route
//         path="/analyst/*"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["ANALYST"]}>
//               <AnalystDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       />

//       {/* Admin Dashboard */}
//       <Route
//         path="/admin/*"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["ADMIN"]}>
//               <AdminDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       />

//       {/* Default */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }


// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./auth/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import RoleRoute from "./components/RoleRoute";

// import AdminDashboard from "./pages/AdminDashboard";
// import RMDashboard from "./pages/RMDashboard";
// import AnalystDashboard from "./pages/AnalystDashboard";

// import UserList from "./features/admin/userList";
// import ClientList from "./features/clients/clientList";
// import ClientDetails from "./features/clients/clientDetails";
// import CreditRequestList from "./features/credit/creditRequestList";
// import CreditRequestReview from "./features/credit/creditRequestReview";
// import Signup from "./auth/Signup";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       {/* ADMIN */}
//       <Route
//         path="/admin"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["ADMIN"]}>
//               <AdminDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       >
//         <Route path="users" element={<UserList />} />
//       </Route>

//       {/* RM */}
//       <Route
//         path="/rm"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["RM"]}>
//               <RMDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       >
//         <Route path="clients" element={<ClientList />} />
//         <Route path="clients/:id" element={<ClientDetails />} />
//         <Route path="credit-requests" element={<CreditRequestList />} />
//       </Route>

//       {/* ANALYST */}
//       <Route
//         path="/analyst"
//         element={
//           <PrivateRoute>
//             <RoleRoute roles={["ANALYST"]}>
//               <AnalystDashboard />
//             </RoleRoute>
//           </PrivateRoute>
//         }
//       >
//         <Route path="credit-requests" element={<CreditRequestList />} />
//         <Route
//           path="credit-requests/:id"
//           element={<CreditRequestReview />}
//         />
//       </Route>

//       <Route path="*" element={<Navigate to="/login" />} />
//      <Route
//   path="/signup"
//   element={
//     <PrivateRoute>
//       <RoleRoute roles={["ADMIN"]}>
//         <Signup />
//       </RoleRoute>
//     </PrivateRoute>
//   }
// />
//     </Routes>
//   );
// }


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
import CreditRequestList from "./features/credit/creditRequestList";
import CreditRequestReview from "./features/credit/creditRequestReview";



export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />

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
        <Route path="clients/:id" element={<ClientDetails />} />
        <Route path="credit-requests" element={<CreditRequestList />} />
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
