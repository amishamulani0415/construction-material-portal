import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Inventory,
  CheckCircle,
  LocalShipping,
  PendingActions,
  QueryStats,
} from "@mui/icons-material";

const stats = [
  { label: "Total Requests", value: 154, icon: <Inventory />, color: "primary" },
  { label: "Approved", value: 86, icon: <CheckCircle />, color: "success" },
  { label: "Pending", value: 28, icon: <PendingActions />, color: "warning" },
  { label: "Delivered", value: 40, icon: <LocalShipping />, color: "info" },
  { label: "Analytics", value: "View", icon: <QueryStats />, color: "secondary" },
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderLeft: `6px solid`,
                borderColor: `${s.color}.main`,
              }}
            >
              {s.icon}
              <Box>
                <Typography variant="subtitle2">{s.label}</Typography>
                <Typography variant="h6" fontWeight={600}>
                  {s.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
