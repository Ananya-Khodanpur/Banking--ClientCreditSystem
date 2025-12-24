// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import ClientList from "../features/clients/clientList";
// import CreditRequestList from "../features/credit/creditRequestList";
// import CreditRequestForm from "../features/clients/creditRequestForm";
// import ClientForm from "../features/clients/clientForm";
// import ClientDetails from "../features/clients/clientDetails";

// export default function RMDashboard() {
//   return (
//     <DashboardLayout>
//       <Routes>
//   <Route path="/" element={<Navigate to="clients" />} />

//   {/* Client Management */}
//   <Route path="clients" element={<ClientList />} />
//   <Route path="clients/new" element={<ClientForm />} />
//   <Route path="clients/:id" element={<ClientDetails />} />

//   {/* Credit Requests */}
//   <Route path="credit-requests" element={<CreditRequestList />} />
//   <Route path="credit-requests/new" element={<CreditRequestForm />} />
// </Routes>

//     </DashboardLayout>
//   );
// }

// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import ClientList from "../features/clients/clientList";
// import ClientForm from "../features/clients/clientForm";
// import ClientDetails from "../features/clients/clientDetails";
// import CreditRequestList from "../features/credit/creditRequestList";
// import CreditRequestForm from "../features/clients/creditRequestForm";


// export default function RMDashboard() {
//   return (
//     <Routes>
//       <Route element={<DashboardLayout />}>
//         <Route index element={<Navigate to="clients" />} />
//         <Route path="clients" element={<ClientList />} />
//         <Route path="clients/new" element={<ClientForm />} />
//         <Route path="clients/:id" element={<ClientDetails />} />
//         <Route path="credit-requests" element={<CreditRequestList />} />
//         <Route path="credit-requests/new" element={<CreditRequestForm />} />
//       </Route>
//     </Routes>
//   );
// }

// import DashboardLayout from "../components/DashboardLayout";

// export default function RMDashboard() {
//   return <DashboardLayout />;
// }

// import { Box, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ClientList from "../features/clients/clientList";
// import CreditRequestList from "../features/credit/creditRequestList";


// export default function RMDashboard() {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       <Typography variant="h5" mb={2}>
//         Relationship Manager Dashboard
//       </Typography>

//       <Box display="flex" gap={2} mb={3}>
//         <Button variant="contained" onClick={() => navigate("/rm/clients/new")}>
//           Add Client
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => navigate("/rm/credit-requests/new")}
//         >
//           Create Credit Request
//         </Button>
//       </Box>

//       <Typography variant="h6" mt={3}>
//         My Clients
//       </Typography>
//       <ClientList />

//       <Typography variant="h6" mt={4}>
//         My Credit Requests
//       </Typography>
//       <CreditRequestList />
//     </Box>
//   );
// }

import DashboardLayout from "../components/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export default function RMDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Relationship Manager Dashboard">
      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" onClick={() => navigate("/rm/clients/new")}>
          Add Client
        </Button>

        <Button variant="contained" onClick={() => navigate("/rm/credit-requests/new")}>
          Create Credit Request
        </Button>
      </Stack>

      <Outlet />
    </DashboardLayout>
  );
}

