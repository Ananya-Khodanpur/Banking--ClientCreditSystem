// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import CreditRequestList from "../features/credit/creditRequestList";
// import CreditRequestReview from "../features/credit/creditRequestReview";




// export default function AnalystDashboard() {
//   return (
//     <DashboardLayout>
//       <Routes>
//   <Route path="/" element={<Navigate to="credit-requests" />} />
//   <Route path="credit-requests" element={<CreditRequestList />} />
//   <Route path="credit-requests/:id" element={<CreditRequestReview />} />
// </Routes>

//     </DashboardLayout>
//   );
// }


// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import CreditRequestList from "../features/credit/creditRequestList";
// import CreditRequestReview from "../features/credit/creditRequestReview";


// export default function AnalystDashboard() {
//   return (
//     <Routes>
//       <Route element={<DashboardLayout />}>
//         <Route index element={<Navigate to="credit-requests" />} />
//         <Route path="credit-requests" element={<CreditRequestList />} />
//         <Route path="credit-requests/:id" element={<CreditRequestReview />} />
//       </Route>
//     </Routes>
//   );
// }


// import DashboardLayout from "../components/DashboardLayout";

// export default function AnalystDashboard() {
//   return <DashboardLayout />;
// }


// import { Box, Typography } from "@mui/material";
// import CreditRequestList from "../features/credit/creditRequestList";

// export default function AnalystDashboard() {
//   return (
//     <Box>
//       <Typography variant="h5" mb={2}>
//         Analyst Dashboard
//       </Typography>

//       <Typography variant="h6" mb={2}>
//         Pending Credit Requests
//       </Typography>

//       <CreditRequestList />
//     </Box>
//   );
// }

import DashboardLayout from "../components/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function AnalystDashboard() {
  return (
    <DashboardLayout title="Analyst Dashboard">
      <Outlet />
    </DashboardLayout>
  );
}

