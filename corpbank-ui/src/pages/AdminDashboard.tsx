// import { Route, Routes } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import Typography from "@mui/material/Typography";
// import UserList from "../features/admin/userList";


// export default function AdminDashboard() {
//   return (
//     <DashboardLayout>
//       <Typography variant="h5">
//         User Management
//         <Routes>
//   <Route path="/" element={<UserList />} />
// </Routes>

//       </Typography>
//       {/* UserManagement component goes here */}

      
//     </DashboardLayout>
//   );
// }

// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import UserList from "../features/admin/userList";
// import CreateUser from "../features/admin/createUser";

// export default function AdminDashboard() {
//   return (
//     <Routes>
//       <Route element={<DashboardLayout />}>
//         <Route index element={<Navigate to="users" />} />
//         <Route path="users" element={<UserList />} />
//         <Route path="users/new" element={<CreateUser />} />
//       </Route>
//     </Routes>
//   );
// }


// import DashboardLayout from "../components/DashboardLayout";

// export default function AdminDashboard() {
//   return <DashboardLayout />;
// }

// import { Box, Typography, Button } from "@mui/material";
// import { useState } from "react";
// import UserList from "../features/admin/userList";
// import CreateUser from "../features/admin/createUser";

// export default function AdminDashboard() {
//   const [showCreate, setShowCreate] = useState(false);

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Typography variant="h5">Admin Dashboard</Typography>
//         <Button variant="contained" onClick={() => setShowCreate(!showCreate)}>
//           {showCreate ? "Close" : "Create User"}
//         </Button>
//       </Box>

//       {showCreate && <CreateUser />}

//       <UserList />
//     </Box>
//   );
// }


import DashboardLayout from "../components/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Admin Dashboard">
      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" onClick={() => navigate("/admin/signup")}>
          Create User
        </Button>
      </Stack>

      <Outlet />
    </DashboardLayout>
  );
}



