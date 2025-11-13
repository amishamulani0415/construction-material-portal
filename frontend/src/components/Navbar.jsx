import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Construction Material Request Portal
        </Typography>
        <Button color="inherit">New Request</Button>
        <Button color="inherit">Manager</Button>
        <Button color="inherit">Track</Button>
        <Button color="inherit">Consumption</Button>
        <Button color="inherit">Pending Summary</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
