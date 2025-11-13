import React, { useEffect, useState } from "react";
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { consumption } from "../api";

export default function History() {
  const [site, setSite] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [period, setPeriod] = useState(30);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await consumption({ site, materialType, period });
      setRows(data.results || []);
    } catch (err) {
      console.error("Error loading consumption history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Consumption History
      </Typography>

      {/* Filter Controls */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        />

        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Material</InputLabel>
          <Select
            value={materialType}
            label="Material"
            onChange={(e) => setMaterialType(e.target.value)}
          >
            {["", "CEMENT", "SAND", "AGGREGATE", "STEEL", "BRICKS", "OTHER"].map(
              (s) => (
                <MenuItem key={s} value={s}>
                  {s || "Any material"}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <TextField
          label="Period (days)"
          type="number"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          size="small"
          sx={{ width: 140 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={load}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Refresh"}
        </Button>
      </Paper>

      {/* Data Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            No data available for the selected filters.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Site</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Material</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600 }}
                  >
                    Total Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600 }}
                  >
                    Requests
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{r._id.site}</TableCell>
                    <TableCell>{r._id.materialType}</TableCell>
                    <TableCell align="right">{r.totalQuantity}</TableCell>
                    <TableCell>{r._id.unit}</TableCell>
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
