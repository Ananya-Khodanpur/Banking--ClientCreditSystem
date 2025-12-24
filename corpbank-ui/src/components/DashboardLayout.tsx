// import { ReactNode } from "react";
// import { Box } from "@mui/material";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return (
//     <Box display="flex" minHeight="100vh">
//       <Box width={240} bgcolor="#1e293b" color="white" p={2}>
//         <strong>Corporate Bank</strong>
//       </Box>

//       <Box flex={1} p={3}>
//         {children}
//       </Box>
//     </Box>
//   );
// }

// import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useAppSelector } from "../hooks";

// export default function DashboardLayout() {
//   const navigate = useNavigate();
//   const role = useAppSelector(state => state.auth.user?.role);

//   return (
//     <div style={{ display: "flex" }}>
//       <Drawer variant="permanent">
//         <List sx={{ width: 240 }}>

//           {/* ADMIN */}
//           {role === "ADMIN" && (
//             <>
//               <ListItemButton onClick={() => navigate("/admin/users")}>
//                 <ListItemText primary="User Management" />
//               </ListItemButton>
//             </>
//           )}

//           {/* RM */}
//           {role === "RM" && (
//             <>
//               <ListItemButton onClick={() => navigate("/rm/clients")}>
//                 <ListItemText primary="Clients" />
//               </ListItemButton>

//               <ListItemButton onClick={() => navigate("/rm/credit-requests")}>
//                 <ListItemText primary="My Credit Requests" />
//               </ListItemButton>
//             </>
//           )}

//           {/* ANALYST */}
//           {role === "ANALYST" && (
//             <>
//               <ListItemButton onClick={() => navigate("/analyst/credit-requests")}>
//                 <ListItemText primary="Credit Requests Review" />
//               </ListItemButton>
//             </>
//           )}

//         </List>
//       </Drawer>

//       <main style={{ flex: 1, padding: 24 }}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";


export default function DashboardLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box display="flex">
      <Sidebar />

      <Box flex={1}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
}



