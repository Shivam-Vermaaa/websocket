// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material"; // this applies margin 0 and padding 0 to all elements

createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <App />
  </>
);
