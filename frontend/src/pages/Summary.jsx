import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Chip,
} from "@mui/material";
import { pendingSummary } from "../api";

export default function Summary() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await pendingSummary();
      setRows(data || []);
    } catch (err) {
      console.error("Error loading summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
        Pending Request Summary
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <CircularProgress />
          </Box>
        ) : rows.length === 0 ? (
          <Typography align="center" sx={{ py: 3 }}>
            No pending requests found.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Site</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Material</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Count
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{r._id.site}</TableCell>
                    <TableCell>{r._id.materialType}</TableCell>
                    <TableCell>
                      <Chip
                        label={r._id.status}
                        color={getStatusColor(r._id.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{r.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
