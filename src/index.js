import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Set up Tailwind CSS custom theme colors
const colors = {
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  }
};

// Inject Tailwind custom properties
if (window.tailwind) {
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: colors.primary
        }
      }
    }
  };
}

// Create root and render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);