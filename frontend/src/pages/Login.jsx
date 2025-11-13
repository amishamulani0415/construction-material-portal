import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log("✅ Login response:", res.data);

      if (res.data && res.data.token) {
        // Save token + user
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);

        // Optional success alert
        setErrorMsg("Login successful!");
        setOpen(true);

        // Redirect after small delay
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setErrorMsg("Unexpected response from server.");
        setOpen(true);
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setErrorMsg(
        err.response?.data?.message || "Invalid credentials. Try again."
      );
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom align="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Don’t have an account? <Link to="/register">Sign up</Link>
          </Typography>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={
            errorMsg === "Login successful!" ? "success" : "error"
          }
          variant="filled"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
