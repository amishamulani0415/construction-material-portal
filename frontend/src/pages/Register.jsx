import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);
      console.log("✅ Registration response:", res.data);
      setError("");
      setOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.response?.data?.message || "Something went wrong");
      setOpen(true);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* 🏗️ Left Hero Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          pl: 8,
          backgroundImage: "url('/assets/register-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Blue-Orange Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(15,76,92,0.9) 0%, rgba(245,124,0,0.5) 100%)",
            zIndex: 1,
          }}
        />

        {/* Hero Text Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            maxWidth: 500,
            animation: "fadeInUp 1.2s ease",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(25px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box
            component="img"
            src="/assets/logo.png"
            alt="Construction Portal Logo"
            sx={{
              width: 90,
              height: "auto",
              mb: 3,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(4px)",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
              padding: "6px 10px",
            }}
          />

          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              mb: 1,
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
              letterSpacing: "0.5px",
            }}
          >
            Build Smarter
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              lineHeight: 1.5,
              opacity: 0.95,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Streamline your construction material requests, approvals, and
            tracking — all in one platform.
          </Typography>

          {/* Quote Card */}
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: 3,
              p: 2.5,
              backdropFilter: "blur(8px)",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.3)",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "translateY(-6px)" },
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              ⚙️ “Every great structure begins with a strong foundation.”
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Join us to manage, monitor, and optimize your construction
              logistics effortlessly.
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* 🧱 Right Form Section — Concrete Glow */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)",
          p: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 440,
            borderRadius: 5,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            boxShadow:
              "0px 6px 15px rgba(0,0,0,0.1), 0px 0px 12px rgba(245,124,0,0.15)",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow:
                "0px 10px 25px rgba(0,0,0,0.15), 0px 0px 18px rgba(245,124,0,0.25)",
            },
          }}
        >
          {/* Animated Accent Strip */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "5px",
              width: "100%",
              background:
                "linear-gradient(90deg, #F57C00 0%, #FFB300 50%, #F57C00 100%)",
              backgroundSize: "200% 100%",
              animation: "moveGradient 4s linear infinite",
              "@keyframes moveGradient": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "100% 50%" },
              },
            }}
          />

          {/* Title Section */}
          <Box sx={{ textAlign: "center", mb: 3, mt: 1 }}>
            <PersonAddAltIcon
              sx={{
                fontSize: 45,
                color: "#F57C00",
                mb: 1,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
            />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#0F4C5C", mb: 0.5 }}
            >
              Create Your Account
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575" }}>
              Join the Construction Resource Portal
            </Typography>
          </Box>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddAltIcon sx={{ color: "#F57C00" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#F57C00" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#F57C00" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                fontSize: "1rem",
                backgroundColor: "#F57C00",
                "&:hover": {
                  backgroundColor: "#E65100",
                },
                boxShadow: "0px 6px 15px rgba(245,124,0,0.4)",
              }}
            >
              Sign Up
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already registered?{" "}
              <Link
                to="/login"
                style={{
                  color: "#0F4C5C",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
          </form>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity={error ? "error" : "success"}
              variant="filled"
              onClose={() => setOpen(false)}
            >
              {error
                ? error
                : "Registration successful! Redirecting to login..."}
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
}
