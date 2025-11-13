import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { createRequest } from "../api";

export default function NewRequest() {
  const [form, setForm] = useState({
    site: "",
    materialType: "CEMENT",
    quantity: 0,
    unit: "Bags",
    requestedBy: "",
  });
  const [photos, setPhotos] = useState([]);
  const [created, setCreated] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const k of Object.keys(form)) data.append(k, form[k]);
    for (const f of photos) data.append("photos", f);

    try {
      const res = await createRequest(data);
      setCreated(res);
      setOpen(true);
      setForm({
        site: "",
        materialType: "CEMENT",
        quantity: 0,
        unit: "Bags",
        requestedBy: "",
      });
      setPhotos([]);
    } catch (err) {
      console.error("Error creating request:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          New Material Request
        </Typography>

        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Site"
            name="site"
            value={form.site}
            onChange={(e) => setForm({ ...form, site: e.target.value })}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Material Type</InputLabel>
            <Select
              name="materialType"
              value={form.materialType}
              label="Material Type"
              onChange={(e) =>
                setForm({ ...form, materialType: e.target.value })
              }
            >
              {["CEMENT", "SAND", "AGGREGATE", "STEEL", "BRICKS", "OTHER"].map(
                (m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                margin="normal"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Requested By"
            name="requestedBy"
            value={form.requestedBy}
            onChange={(e) => setForm({ ...form, requestedBy: e.target.value })}
            margin="normal"
            required
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => setPhotos([...e.target.files])}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </form>

        {/* Success Message */}
        {created && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="subtitle1" fontWeight={500}>
              ✅ Request Created Successfully
            </Typography>
            <Typography variant="body2">ID: {created._id}</Typography>
            <Typography variant="body2">Status: {created.status}</Typography>
            {created.photos?.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Photos:
                {created.photos.map((p, i) => (
                  <a
                    key={i}
                    href={`http://localhost:4000${p}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginLeft: 8 }}
                  >
                    photo{i + 1}
                  </a>
                ))}
              </Typography>
            )}
          </Box>
        )}

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setOpen(false)}
          >
            Material request submitted successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
