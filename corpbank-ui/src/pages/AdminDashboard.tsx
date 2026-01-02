import DashboardLayout from "../components/DashboardLayout";
import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    rmUsers: 0,
    analystUsers: 0,
  });
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    api.get("/api/admin/users").then(res => {
      const users = res.data;
      setStats({
        totalUsers: users.length,
        activeUsers: users.filter((u: any) => u.active).length,
        adminUsers: users.filter((u: any) => u.role === "ADMIN").length,
        rmUsers: users.filter((u: any) => u.role === "RM").length,
        analystUsers: users.filter((u: any) => u.role === "ANALYST").length,
      });
    });
  }, []);

  return (
    <DashboardLayout title={`Admin Dashboard - Welcome ${user?.username}`}>
      <Box mb={4}>
        <Typography variant="h6" mb={3} color="text.secondary">
          System Overview
        </Typography>

        {/* Statistics Cards */}
        <Box display="flex" gap={3} mb={4} flexWrap="wrap">
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#e3f2fd", border: "1px solid #90caf9" }}>
              <CardContent>
                <Typography variant="h4" color="#1976d2">
                  {stats.totalUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#e8f5e8", border: "1px solid #81c784" }}>
              <CardContent>
                <Typography variant="h4" color="#2e7d32">
                  {stats.activeUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#fff3e0", border: "1px solid #ffb74d" }}>
              <CardContent>
                <Typography variant="h4" color="#f57c00">
                  {stats.rmUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  RM Users
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box flex="1 1 200px">
            <Card sx={{ backgroundColor: "#f3e5f5", border: "1px solid #ba68c8" }}>
              <CardContent>
                <Typography variant="h4" color="#7b1fa2">
                  {stats.analystUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Analyst Users
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
              Use the sidebar navigation to manage users and system settings.
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip label="User Management" size="small" color="primary" />
              <Chip label="Create New User" size="small" color="secondary" />
              <Chip label="View All Users" size="small" variant="outlined" />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Outlet />
    </DashboardLayout>
  );
}



