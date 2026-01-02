import { AppBar, Toolbar, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ "& .MuiBreadcrumbs-separator": { mx: 1 } }}>
        <Link
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Dashboard
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          
          return last ? (
            <Typography key={to} color="text.primary">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              color="inherit"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f5f5">
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: "linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)",
            color: "text.primary",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="primary.main"
                sx={{ mb: 0.5 }}
              >
                {title}
              </Typography>
              {generateBreadcrumbs()}
            </Box>
          </Toolbar>
        </AppBar>

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            overflow: "auto",
            background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}



