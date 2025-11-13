import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);
        setErrorMsg("Login successful!");
        setOpen(true);

        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setErrorMsg("Unexpected server response.");
        setOpen(true);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials.");
      setOpen(true);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          width: "100%",
          background:
            "linear-gradient(135deg, #004e64 0%, #0a6e76 40%, #f4a261 100%)",
          color: "white",
          pt: 8,
          pb: 14, // 🔥 increased bottom padding
          px: { xs: 3, md: 10 },
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/assets/logo.png"
          alt="Construction Portal Logo"
          sx={{
            width: 130,
            position: "absolute",
            top: 20,
            left: 25,
            opacity: 0.95,
          }}
        />

        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ mt: 10, mb: 2, letterSpacing: "1px" }}
        >
          Welcome Back
        </Typography>

        <Typography variant="h6" sx={{ maxWidth: 600, opacity: 0.95 }}>
          Sign in to access construction material requests, tracking, and
          management.
        </Typography>

        {/* Security Notice */}
        <Paper
          elevation={6}
          sx={{
            mt: 4,
            p: 3,
            maxWidth: 520,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 3,
            color: "white",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LockOutlinedIcon /> Secure Login
          </Typography>
          <Typography sx={{ mt: 1, opacity: 0.95 }}>
            Your dashboard and approvals are protected with industry-grade encryption.
          </Typography>
        </Paper>
      </Box>

      {/* LOGIN FORM */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -8, // 🔥 gentle pull-up, not too aggressive
          px: 2,
          pb: 8,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 460,
            p: 4,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            sx={{ mb: 2, color: "#004e64" }}
          >
            Login to Portal
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: "1rem",
                backgroundColor: "#f4a261",
                "&:hover": { backgroundColor: "#e38b42" },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Sign In
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don’t have an account? <Link to="/register">Create one</Link>
            </Typography>
          </form>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert
          severity={errorMsg === "Login successful!" ? "success" : "error"}
          variant="filled"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
