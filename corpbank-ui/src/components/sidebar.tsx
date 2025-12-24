import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

type Role = "ADMIN" | "RM" | "ANALYST";

const drawerWidth = 240;

export default function Sidebar() {
  const role = useSelector((s: RootState) => s.auth.user?.role) as Role | undefined;
  const navigate = useNavigate();

  if (!role) return null;

  const menu: Record<Role, { label: string; path: string }[]> = {
    ADMIN: [
      { label: "User Management", path: "/admin/users" },
    ],
    RM: [
      { label: "Clients", path: "/rm/clients" },
      { label: "My Credit Requests", path: "/rm/credit-requests" },
    ],
    ANALYST: [
      { label: "Credit Requests", path: "/analyst/credit-requests" },
    ],
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <List>
        {menu[role].map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
