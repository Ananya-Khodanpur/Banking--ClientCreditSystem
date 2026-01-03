import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

type Role = "ADMIN" | "RM" | "ANALYST";

const drawerWidth = 260;

export default function Sidebar() {
  const role = useSelector((s: RootState) => s.auth.user?.role) as Role | undefined;
  const user = useSelector((s: RootState) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!role) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const commonMenu = [
    { label: "Dashboard", path: "/dashboard" },
  ];

  const roleMenu: Record<Role, { label: string; path: string }[]> = {
    ADMIN: [
      { label: "User Management", path: "/admin/users" },
      { label: "Create User", path: "/admin/signup" },
    ],
    RM: [
      { label: "Clients", path: "/rm/clients" },
      { label: "Add New Client", path: "/rm/clients/new" },
      { label: "My Credit Requests", path: "/rm/credit-requests" },
      { label: "Create Credit Request", path: "/rm/credit-requests/new" },
    ],
    ANALYST: [
      { label: "Credit Requests", path: "/analyst/credit-requests" },
    ],
  };

  const allMenu = [
    { label: "Admin Dashboard", path: "/admin" },
    { label: "RM Dashboard", path: "/rm" },
    { label: "Analyst Dashboard", path: "/analyst" },
  ];

  const menuItems = [...commonMenu, ...roleMenu[role]];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth,
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          p: 3, 
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6" noWrap fontWeight="bold" sx={{ mb: 1 }}>
          Corporate Banking
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {user?.username}
          </Typography>
          <Chip 
            label={role} 
            size="small" 
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.7rem",
              height: "20px",
            }}
          />
        </Box>
      </Box>

      {/* Main Navigation */}
      <List sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>
          Main Menu
        </Typography>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              px: 2,
              py: 1.5,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(102, 126, 234, 0.08)",
                transform: "translateX(4px)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(102, 126, 234, 0.12)",
                borderLeft: "3px solid #667eea",
              },
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Quick Access Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: "text.secondary", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>
          Quick Access
        </Typography>
        {allMenu.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 0.5,
              borderRadius: 2,
              px: 2,
              py: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "translateX(2px)",
              },
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.8rem",
                  color: "text.secondary",
                },
              }}
            />
          </ListItemButton>
        ))}
        
        <Divider sx={{ my: 2, mx: 2 }} />
        
        <ListItemButton 
          onClick={handleLogout} 
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.08)",
              transform: "translateX(2px)",
            },
          }}
        >
          <ListItemText 
            primary="Logout"
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#f44336",
              },
            }}
          />
        </ListItemButton>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 Corporate Banking
        </Typography>
      </Box>
    </Drawer>
  );
}
