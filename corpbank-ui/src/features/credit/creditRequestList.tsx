// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { List, ListItem, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// export default function CreditRequestList() {
//   const [requests, setRequests] = useState<any[]>([]);
//   const role = useSelector((s: RootState) => s.auth.user?.role);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/api/credit-requests").then(res => setRequests(res.data));
//   }, []);

//   return (
//     <>
//       <Typography variant="h6" gutterBottom>
//         Credit Requests
//       </Typography>

//       <List>
//         {requests.map(r => (
//           <ListItem key={r.id} divider sx={{ display: "flex", justifyContent: "space-between" }}>
//             <span>
//               ₹{r.requestAmount} — {r.status}
//             </span>

//             {role === "ANALYST" && (
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate(`/analyst/credit-requests/${r.id}`)}
//               >
//                 Review
//               </Button>
//             )}
//           </ListItem>
//         ))}
//       </List>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  List,
  ListItem,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function CreditRequestList() {
  const [requests, setRequests] = useState<any[]>([]);
  const navigate = useNavigate();
  const role = useSelector((s: RootState) => s.auth.user?.role);

  useEffect(() => {
    api.get("/api/credit-requests").then((res) => setRequests(res.data));
  }, []);

  return (
    <>
      <Typography variant="h6" mb={2}>
        Credit Requests
      </Typography>

      <List>
        {requests.map((r) => (
          <ListItem key={r.id} divider>
            ₹{r.requestAmount}
            <Chip
              label={r.status}
              sx={{ ml: 2 }}
              color={r.status === "PENDING" ? "warning" : "success"}
            />

            {role === "ANALYST" && (
              <Button
                sx={{ ml: "auto" }}
                onClick={() =>
                  navigate(`/analyst/credit-requests/${r.id}`)
                }
              >
                Review
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}

