import DashboardLayout from "../components/DashboardLayout";
import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function RMDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeCreditRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
  });
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Fetch clients
    api.get("/api/clients").then(res => {
      const clients = res.data;
      setStats(prev => ({ ...prev, totalClients: clients.length }));
    });

    // Fetch credit requests
    api.get("/api/credit-requests").then(res => {
      const requests = res.data;
      setStats({
        totalClients: stats.totalClients,
        activeCreditRequests: requests.length,
        approvedRequests: requests.filter((r: any) => r.status === "APPROVED").length,
        pendingRequests: requests.filter((r: any) => r.status === "PENDING").length,
      });
    });
  }, []);

  return (
    <DashboardLayout title={`Relationship Manager Dashboard - Welcome ${user?.username}`}>
      <Box mb={4}>
        <Typography variant="h6" mb={3} color="text.secondary">
          Client Portfolio Overview
        </Typography>

        {/* Statistics Cards */}
        <Box display="flex" gap={3} mb={4} flexWrap="wrap">
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#e8f5e8", border: "1px solid #81c784" }}>
              <CardContent>
                <Typography variant="h4" color="#2e7d32">
                  {stats.totalClients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Clients
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#fff3e0", border: "1px solid #ffb74d" }}>
              <CardContent>
                <Typography variant="h4" color="#f57c00">
                  {stats.activeCreditRequests}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Credit Requests
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#e3f2fd", border: "1px solid #90caf9" }}>
              <CardContent>
                <Typography variant="h4" color="#1976d2">
                  {stats.approvedRequests}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#fff8e1", border: "1px solid #ffecb3" }}>
              <CardContent>
                <Typography variant="h4" color="#f57f17">
                  {stats.pendingRequests}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Review
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Card sx={{ backgroundColor: "#fafafa", border: "1px solid #e0e0e0" }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Manage your clients and credit requests using the sidebar navigation.
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip label="View Clients" size="small" color="primary" />
              <Chip label="Add New Client" size="small" color="secondary" />
              <Chip label="Credit Requests" size="small" variant="outlined" />
              <Chip label="Create Request" size="small" variant="outlined" />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Outlet />
    </DashboardLayout>
  );
}

