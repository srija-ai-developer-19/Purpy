import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Checkout from "./pages/Checkout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* ⭐ SHOP - /?view=home / category / items / cart / wishlist ⭐ */}
      <Route path="/" element={<App />} />

      {/* ⭐ LOGIN / SIGNUP - Full Screen ⭐ */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ⭐ PRIVACY / TERMS ⭐ */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />

      {/* ⭐ CHECKOUT ⭐ */}
      <Route path="/checkout" element={<Checkout />} />

      {/* ⭐ Emaina - Thappu - URL - Kotttina - Home - Ki - Pampisthundi ⭐ */}
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);