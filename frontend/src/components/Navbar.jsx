import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "New Request", path: "/" },
    { label: "Manager", path: "/manager" },
    { label: "Track", path: "/track" },
    { label: "Consumption", path: "/history" },
    { label: "Pending Summary", path: "/summary" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 2000, // 🔥 ensures navbar is above hero gradient
        background:
          "linear-gradient(135deg, rgba(0,78,100,0.90) 0%, rgba(10,110,118,0.85) 50%, rgba(244,162,97,0.75) 100%)",
        backdropFilter: "blur(12px)",
        px: { xs: 2, md: 6 },
        py: 1.2,
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box
          component="img"
          src="/logo-transparent.png"
          alt="Construction Portal Logo"
          sx={{
            height: 42,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
          }}
        />

        {/* Nav Items */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                textTransform: "none",
                color: "white",
                fontWeight: 500,
                fontSize: "1rem",
                borderBottom:
                  location.pathname === item.path
                    ? "3px solid #f4a261"
                    : "3px solid transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
