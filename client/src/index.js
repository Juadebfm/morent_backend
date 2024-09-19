import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarProvider } from "./context/carContext";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CarProvider>
  </React.StrictMode>
);
