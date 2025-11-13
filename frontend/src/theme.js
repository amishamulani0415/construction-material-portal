import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#f57c00", // orange
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
