import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import {
  listRequests,
  approveRequest,
  rejectRequest,
  updateStatus,
} from "../api";

export default function ManagerDashboard() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await listRequests({ status: filter });
      setItems(data || []);
    } catch (err) {
      console.error("Error loading requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleAction = async (type) => {
    if (!selectedItem) return;
    try {
      if (type === "approve") await approveRequest(selectedItem._id, comment);
      else if (type === "reject") await rejectRequest(selectedItem._id, comment);
      setDialogOpen(false);
      setComment("");
      await load();
    } catch (err) {
      console.error(`Error performing ${type} action:`, err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    await load();
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
        Manager Dashboard
      </Typography>

      {/* Filter Bar */}
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
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            label="Status Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            {[
              "PENDING",
              "APPROVED",
              "REJECTED",
              "DISPATCHED",
              "DELIVERED",
              "",
            ].map((s) => (
              <MenuItem key={s} value={s}>
                {s || "ALL"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={load}
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} color="inherit" />}
        >
          Refresh
        </Button>
      </Paper>

      {/* Request List */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography align="center" sx={{ py: 3 }}>
          No requests found for the selected status.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((it) => (
            <Grid item xs={12} md={6} key={it._id}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {it.materialType} — {it.quantity} {it.unit}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Site: {it.site}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requested By: {it.requestedBy}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={it.status}
                      color={getStatusColor(it.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Photos:{" "}
                    {it.photos?.map((p, i) => (
                      <a
                        key={i}
                        href={`http://localhost:4000${p}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginLeft: 6 }}
                      >
                        photo{i + 1}
                      </a>
                    ))}
                  </Typography>
                </CardContent>

                <CardActions sx={{ display: "flex", gap: 1, px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setActionType("approve");
                      setSelectedItem(it);
                      setDialogOpen(true);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setActionType("reject");
                      setSelectedItem(it);
                      setDialogOpen(true);
                    }}
                  >
                    Reject
                  </Button>

                  <FormControl size="small" sx={{ ml: "auto", minWidth: 130 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={it.status}
                      label="Status"
                      onChange={(e) =>
                        handleStatusChange(it._id, e.target.value)
                      }
                    >
                      {[
                        "PENDING",
                        "APPROVED",
                        "REJECTED",
                        "DISPATCHED",
                        "DELIVERED",
                      ].map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Comment Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {actionType === "approve" ? "Approve Request" : "Reject Request"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Manager Comment"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={actionType === "approve" ? "success" : "error"}
            onClick={() => handleAction(actionType)}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
