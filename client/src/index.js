import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from  "./components/auth0-provider-with-navigate";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

