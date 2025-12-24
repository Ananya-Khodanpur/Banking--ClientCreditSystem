import { Button, TextField, Container, Typography } from "@mui/material";
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

    await api.post("/api/rm/clients", {
      companyName: form.companyName,
      industry: form.industry,
      address: form.address,
      annualTurnover: Number(form.annualTurnover),
      documentsSubmitted: true,
      primaryContact: {
        name: form.primaryContactName,
        email: form.primaryContactEmail,
        phone: form.primaryContactPhone,
      },
    });

    navigate("/rm/clients");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Create Client</Typography>

      {Object.entries(form).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          fullWidth
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <Button variant="contained" onClick={submit}>
        Save
      </Button>
    </Container>
  );
}
