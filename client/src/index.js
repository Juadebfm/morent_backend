import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarProvider } from "./context/carContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CarProvider>
      <App />
    </CarProvider>
  </React.StrictMode>
);
