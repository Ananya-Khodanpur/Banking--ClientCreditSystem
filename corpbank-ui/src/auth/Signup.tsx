import { Button, TextField, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "RM",
  });

  const submit = async () => {
    try {
      await api.post("/api/auth/register", form);
      alert("User created successfully");
    } catch (e: any) {
      alert(e.response?.data?.message || "Forbidden");
    }
  };

  return (
    <Box maxWidth={400}>
      <TextField label="Username" fullWidth margin="normal"
        onChange={e => setForm({ ...form, username: e.target.value })} />

      <TextField label="Email" fullWidth margin="normal"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <TextField label="Password" type="password" fullWidth margin="normal"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <TextField select label="Role" fullWidth margin="normal"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}>
        <MenuItem value="RM">RM</MenuItem>
        <MenuItem value="ANALYST">ANALYST</MenuItem>
      </TextField>

      <Button variant="contained" fullWidth onClick={submit}>
        Create User
      </Button>
    </Box>
  );
}
