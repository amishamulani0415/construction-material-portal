import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2, #2196f3)",
        color: "#fff",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Construction Material Request Portal
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, maxWidth: 600 }}>
        Streamline your site material requests, approvals, and tracking with ease.
      </Typography>

      <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="secondary"
          size="large"
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
          size="large"
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}
