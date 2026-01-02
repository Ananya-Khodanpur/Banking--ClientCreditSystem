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
  Typography,
  Button,
  Chip,
  Box,
  Card,
  CardContent,
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

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "warning";
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "default";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        {role === "ANALYST" ? "Credit Requests for Review" : "My Credit Requests"}
      </Typography>

      {requests.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No credit requests found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {role === "RM" 
                ? "Create your first credit request to get started"
                : "No credit requests require review at this time"
              }
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {requests.map((r) => (
            <Card 
              key={r.id}
              sx={{ 
                cursor: "pointer",
                "&:hover": { boxShadow: 4 },
                transition: "box-shadow 0.2s"
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Typography variant="h6" color="primary">
                    {formatAmount(r.requestAmount || 0)}
                  </Typography>
                  <Chip
                    label={r.status || "UNKNOWN"}
                    color={getStatusColor(r.status)}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Tenure: {r.tenureMonths || 0} months
                </Typography>
                
                <Typography variant="body2" noWrap sx={{ mb: 2 }}>
                  Purpose: {r.purpose || "Not specified"}
                </Typography>
                
                <Box display="flex" gap={1}>
                  {role === "ANALYST" && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate(`/analyst/credit-requests/${r.id}`)}
                    >
                      Review
                    </Button>
                  )}
                  
                  {role === "RM" && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/rm/credit-requests/${r.id}`)}
                    >
                      View Details
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

