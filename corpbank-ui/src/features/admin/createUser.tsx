import { useState } from "react";
import api from "../../api/axios";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

export default function CreateUser() {
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
  } catch (err: any) {
    alert(err.response?.data?.message || "User creation failed");
  }
};


  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2}>
        Create User
      </Typography>

      <TextField fullWidth label="Username" margin="normal"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />

      <TextField fullWidth label="Email" margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <TextField fullWidth type="password" label="Password" margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <TextField select fullWidth label="Role" margin="normal"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <MenuItem value="RM">RM</MenuItem>
        <MenuItem value="ANALYST">ANALYST</MenuItem>
      </TextField>

      <Button variant="contained" sx={{ mt: 2 }} onClick={submit}>
        Create User
      </Button>
    </Box>
  );
}
