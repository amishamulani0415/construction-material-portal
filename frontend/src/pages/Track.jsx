import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import { listRequests } from "../api";

export default function Track() {
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    try {
      setLoading(true);
      const data = await listRequests({ site, status });
      setItems(data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    "PENDING",
    "APPROVED",
    "DISPATCHED",
    "DELIVERED",
    "REJECTED",
  ];

  const getStatusIndex = (status) => {
    const index = statusSteps.indexOf(status);
    return index >= 0 ? index : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      case "DISPATCHED":
        return "info";
      case "DELIVERED":
        return "primary";
      default:
        return "warning";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Track Material Requests
      </Typography>

      {/* Filter bar */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "",
              "PENDING",
              "APPROVED",
              "DISPATCHED",
              "DELIVERED",
              "REJECTED",
            ].map((s) => (
              <MenuItem key={s} value={s}>
                {s || "Any status"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={search}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Search"}
        </Button>
      </Paper>

      {/* Results */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography align="center" sx={{ py: 3 }}>
          No requests found for the given filters.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((it) => (
            <Grid item xs={12} md={6} key={it._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {it.materialType} — {it.quantity} {it.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Site: {it.site}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Requested By: {it.requestedBy}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Status Indicator */}
                <Chip
                  label={it.status}
                  color={getStatusColor(it.status)}
                  size="small"
                  sx={{ mb: 2 }}
                />

                {/* Stepper Visualization */}
                <Stepper
                  activeStep={getStatusIndex(it.status)}
                  alternativeLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "0.75rem",
                    },
                  }}
                >
                  {statusSteps.map((label, index) => (
                    <Step key={label} completed={index < getStatusIndex(it.status)}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
