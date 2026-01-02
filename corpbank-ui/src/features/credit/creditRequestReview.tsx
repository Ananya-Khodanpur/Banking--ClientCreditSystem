import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  Container, Typography, Card, CardContent, Button, Box,
  Chip, TextField, Paper, Divider, Fade
} from "@mui/material";

export default function CreditRequestReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`/api/credit-requests/${id}`).then(res => setRequest(res.data));
    }
  }, [id]);

  const handleAction = async (status: string) => {
    setLoading(true);
    try {
      await api.put(`/api/credit-requests/${id}`, {
        status,
        remarks
      });
      navigate("/analyst/credit-requests");
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Error updating request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  if (!request) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Fade in timeout={600}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Credit Request Review
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Review and approve or reject this credit request
          </Typography>

          <Box display="flex" gap={3}>
            {/* Request Details Card */}
            <Box flex={2}>
              <Card 
                elevation={0}
                sx={{ 
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Request Information
                  </Typography>
                </Box>
                
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" gap={3} mb={3}>
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Request Amount
                      </Typography>
                      <Typography variant="h5" color="primary.main" fontWeight="bold">
                        {formatAmount(request.requestAmount || 0)}
                      </Typography>
                    </Box>
                    
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Tenure
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {request.tenureMonths || 0} months
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" gap={3} mb={3}>
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Client ID
                      </Typography>
                      <Typography variant="body1" fontWeight="500">
                        {request.clientId || "N/A"}
                      </Typography>
                    </Box>
                    
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Status
                      </Typography>
                      <Chip
                        label={request.status || "UNKNOWN"}
                        color={getStatusColor(request.status)}
                        size="medium"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Purpose of Credit
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        borderRadius: 2,
                        border: "1px solid rgba(0, 0, 0, 0.06)"
                      }}
                    >
                      <Typography variant="body1">
                        {request.purpose || "No purpose specified"}
                      </Typography>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Action Panel */}
            <Box flex={1}>
              <Card 
                elevation={0}
                sx={{ 
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                  height: "fit-content",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Review Action
                  </Typography>
                  
                  <TextField
                    label="Review Remarks"
                    fullWidth
                    multiline
                    rows={4}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    margin="normal"
                    placeholder="Enter your review comments..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={() => handleAction("APPROVED")}
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                        boxShadow: "0 4px 15px 0 rgba(76, 175, 80, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px 0 rgba(76, 175, 80, 0.4)",
                        },
                      }}
                    >
                      {loading ? "Processing..." : "Approve Request"}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      onClick={() => handleAction("REJECTED")}
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderColor: "#f44336",
                        color: "#f44336",
                        "&:hover": {
                          borderColor: "#d32f2f",
                          backgroundColor: "rgba(244, 67, 54, 0.04)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {loading ? "Processing..." : "Reject Request"}
                    </Button>
                    
                    <Button
                      variant="text"
                      onClick={() => navigate("/analyst/credit-requests")}
                      sx={{
                        py: 1.5,
                        color: "text.secondary",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      Back to Requests
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}
