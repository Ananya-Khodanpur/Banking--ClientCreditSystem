import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  TextField, Button, Container, Typography, MenuItem, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreditRequestForm() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);
  const [form, setForm] = useState({
    clientId: "",
    requestAmount: "",
    tenureMonths: "",
    purpose: "",
  });

  useEffect(() => {
    api.get("/api/clients").then(res => setClients(res.data));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post("/api/credit-requests", {
        clientId: form.clientId,
        requestAmount: Number(form.requestAmount),
        tenureMonths: Number(form.tenureMonths),
        purpose: form.purpose,
      });
      navigate("/rm/credit-requests");
    } catch (error) {
      console.error("Error creating credit request:", error);
      alert("Error creating credit request. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mb={3}>Create Credit Request</Typography>
      
      <Box component="form" onSubmit={submit}>
        <TextField
          select
          label="Select Client"
          fullWidth
          required
          margin="normal"
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: e.target.value })}
        >
          {clients.map(client => (
            <MenuItem key={client.id} value={client.id}>
              {client.companyName} - {client.industry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Request Amount (₹)"
          type="number"
          fullWidth
          required
          margin="normal"
          value={form.requestAmount}
          onChange={(e) => setForm({ ...form, requestAmount: e.target.value })}
          inputProps={{ min: 1 }}
        />

        <TextField
          label="Tenure (Months)"
          type="number"
          fullWidth
          required
          margin="normal"
          value={form.tenureMonths}
          onChange={(e) => setForm({ ...form, tenureMonths: e.target.value })}
          inputProps={{ min: 1, max: 360 }}
        />

        <TextField
          label="Purpose of Credit"
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          placeholder="Describe the purpose of this credit request..."
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit Credit Request
        </Button>
      </Box>
    </Container>
  );
}
