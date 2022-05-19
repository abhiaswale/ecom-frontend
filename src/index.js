import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/Context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./components/Context/cart-context";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
