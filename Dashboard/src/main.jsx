import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AdminProvider } from "./context/adminContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <App />
  </AdminProvider>
);
