import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

// Import Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewRequest from "./pages/NewRequest.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import Track from "./pages/Track.jsx";
import History from "./pages/History.jsx";
import Summary from "./pages/Summary.jsx";

const NavBar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "New Request", path: "/new" },
    { label: "Manager", path: "/manager" },
    { label: "Track", path: "/track" },
    { label: "Consumption", path: "/history" },
    { label: "Pending Summary", path: "/summary" },
  ];

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Construction Material Request Portal
        </Typography>

        {user ? (
          <>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  textTransform: "none",
                  borderBottom:
                    location.pathname === item.path
                      ? "2px solid white"
                      : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={() => {
                setUser(null);
                navigate("/login");
              }}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default function App() {
  const [user, setUser] = useState(null); // Simple state for authentication

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <NavBar user={user} setUser={setUser} />
      <Container sx={{ pt: 4, pb: 6 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new" element={<NewRequest />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/track" element={<Track />} />
              <Route path="/history" element={<History />} />
              <Route path="/summary" element={<Summary />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Container>
    </Box>
  );
}
