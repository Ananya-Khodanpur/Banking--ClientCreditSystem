import {
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const resultAction = await dispatch(login({ username, password }));
      if (login.fulfilled.match(resultAction)) {
        const role = resultAction.payload.user.role;

        if (role === "RM") navigate("/rm");
        if (role === "ANALYST") navigate("/analyst");
        if (role === "ADMIN") navigate("/admin");
      }
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1523289333742-be1143f6b766)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
            Corporate Banking
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            mb={3}
          >
            Secure Login Portal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 3, py: 1.2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
