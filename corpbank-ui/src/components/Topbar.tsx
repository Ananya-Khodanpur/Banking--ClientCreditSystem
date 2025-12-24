// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";

// export default function TopBar() {
//   const dispatch = useDispatch();

//   return (
//     <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           CorpBank Dashboard
//         </Typography>
//         <Button color="inherit" onClick={() => dispatch(logout())}>
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

import { AppBar, Toolbar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

