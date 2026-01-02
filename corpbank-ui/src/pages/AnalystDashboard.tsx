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
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Stack, Typography, Box, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AnalystDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    api.get("/api/credit-requests").then(res => {
      const requests = res.data;
      setStats({
        pending: requests.filter((r: any) => r.status === "PENDING").length,
        approved: requests.filter((r: any) => r.status === "APPROVED").length,
        rejected: requests.filter((r: any) => r.status === "REJECTED").length,
        total: requests.length
      });
    });
  }, []);

  return (
    <DashboardLayout title={`Analyst Dashboard - Welcome ${user?.username}`}>
      <Box mb={4}>
        <Stack direction="row" spacing={2} mb={3}>
          <Button 
            variant="contained" 
            onClick={() => navigate("/analyst/credit-requests")}
          >
            View All Requests
          </Button>
        </Stack>

        {/* Statistics Cards */}
        <Box display="flex" gap={2} mb={4}>
          <Card sx={{ flex: 1, backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h4" color="#f57c00">
                {stats.pending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, backgroundColor: "#e8f5e8" }}>
            <CardContent>
              <Typography variant="h4" color="#2e7d32">
                {stats.approved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approved
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, backgroundColor: "#ffebee" }}>
            <CardContent>
              <Typography variant="h4" color="#c62828">
                {stats.rejected}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rejected
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, backgroundColor: "#f3e5f5" }}>
            <CardContent>
              <Typography variant="h4" color="#7b1fa2">
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Requests
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {stats.pending > 0 && (
          <Card sx={{ backgroundColor: "#fff8e1", border: "1px solid #ffecb3" }}>
            <CardContent>
              <Typography variant="h6" color="#f57c00" mb={1}>
                📋 Pending Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You have {stats.pending} credit request{stats.pending > 1 ? 's' : ''} pending review.
                Click "View All Requests" to start reviewing.
              </Typography>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ mt: 2 }}
                onClick={() => navigate("/analyst/credit-requests")}
              >
                Start Reviewing
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      <Outlet />
    </DashboardLayout>
  );
}

