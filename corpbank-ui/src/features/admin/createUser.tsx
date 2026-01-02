import { useState } from "react";
import api from "../../api/axios";
import {
  TextField, Button, Container, Typography, MenuItem, Box
} from "@mui/material";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "RM",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post("/api/admin/register", form);
      alert("User created successfully");
      setForm({
        username: "",
        email: "",
        password: "",
        role: "RM",
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating user");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" mb={3}>Create New User</Typography>
      
      <Box component="form" onSubmit={submit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <TextField
          select
          label="Role"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <MenuItem value="RM">Relationship Manager</MenuItem>
          <MenuItem value="ANALYST">Credit Analyst</MenuItem>
          <MenuItem value="ADMIN">Administrator</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create User
        </Button>
      </Box>
    </Container>
  );
}
