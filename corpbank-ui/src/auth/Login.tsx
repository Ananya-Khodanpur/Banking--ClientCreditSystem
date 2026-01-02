import {
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Paper,
  Avatar,
  Fade,
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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        },
      }}
    >
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.45)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                <Typography variant="h5" color="white">
                  CB
                </Typography>
              </Avatar>
            </Box>

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
              <Alert severity="error" sx={{ mb: 2 }} variant="filled">
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
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{ 
                  mt: 3, 
                  py: 1.5,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 4px 15px 0 rgba(33, 203, 243, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2 30%, #00ACC1 90%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px 0 rgba(33, 203, 243, 0.4)",
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              © 2024 Corporate Banking System
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
