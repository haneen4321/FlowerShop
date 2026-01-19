import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./presentation/context/CartContext";
import { LanguageProvider } from "./presentation/context/LanguageContext";

import "./presentation/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </LanguageProvider>
);