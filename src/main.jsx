import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { LanguageProvider } from "./presentation/context/LanguageContext";
import { AuthProvider } from "./presentation/context/AuthContext";
import { CartProvider } from "./presentation/context/CartContext";

import "./presentation/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </LanguageProvider>
);