import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartContextProvider } from "./cartContext";
import { SearchContextProvider } from "./searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);
