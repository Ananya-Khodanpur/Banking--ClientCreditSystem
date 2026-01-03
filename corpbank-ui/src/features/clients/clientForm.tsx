import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ClientForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    address: "",
    annualTurnover: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/rm/clients", {
        companyName: form.companyName,
        industry: form.industry,
        address: form.address,
        annualTurnover: Number(form.annualTurnover),
        documentsSubmitted: true,
        contactName: form.primaryContactName,
        contactEmail: form.primaryContactEmail,
        contactPhone: form.primaryContactPhone,
      });

      navigate("/rm/clients");
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Error creating client. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" mb={3}>Create New Client</Typography>
      
      <Box component="form" onSubmit={submit}>
        <TextField
          label="Company Name"
          fullWidth
          required
          margin="normal"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        
        <Box display="flex" gap={2}>
          <TextField
            label="Industry"
            fullWidth
            required
            margin="normal"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
          />
          
          <TextField
            label="Annual Turnover"
            type="number"
            fullWidth
            required
            margin="normal"
            value={form.annualTurnover}
            onChange={(e) => setForm({ ...form, annualTurnover: e.target.value })}
          />
        </Box>
        
        <TextField
          label="Address"
          multiline
          rows={3}
          fullWidth
          required
          margin="normal"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        
        <Typography variant="h6" mt={3} mb={2}>Primary Contact</Typography>
        
        <Box display="flex" gap={2}>
          <TextField
            label="Contact Name"
            fullWidth
            required
            margin="normal"
            value={form.primaryContactName}
            onChange={(e) => setForm({ ...form, primaryContactName: e.target.value })}
          />
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={form.primaryContactEmail}
            onChange={(e) => setForm({ ...form, primaryContactEmail: e.target.value })}
          />
          
          <TextField
            label="Phone"
            fullWidth
            required
            margin="normal"
            value={form.primaryContactPhone}
            onChange={(e) => setForm({ ...form, primaryContactPhone: e.target.value })}
          />
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          Create Client
        </Button>
      </Box>
    </Container>
  );
}
