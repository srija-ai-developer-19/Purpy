import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { sendOTP, verifyOTP } from "../api/auth";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedUser = JSON.parse(localStorage.getItem("purpyUser") || "null");

  const [tab, setTab] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Save REAL JWT token from backend - Not fake token
  const doLoginSuccess = (token, userData) => {
    if (!token) {
      setMessage("❌ Login failed - No token from server");
      setIsLoading(false);
      return;
    }
    localStorage.setItem("purpyToken", token);
    localStorage.setItem("token", token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("purpyUser", JSON.stringify(userData));
    localStorage.setItem(
      "purpyWallet",
      JSON.stringify({ balance: userData.wallet ?? 1250, goldCoins: userData.goldCoins ?? 320 })
    );
    const redirectTo =
      location.state?.from ||
      sessionStorage.getItem("purpyRedirectAfterLogin") ||
      "/?view=products";
    sessionStorage.removeItem("purpyRedirectAfterLogin");
    setIsLoading(false);
    navigate(redirectTo, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("purpyUser");
    localStorage.removeItem("purpyToken");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      setMessage("❌ Please Enter 10 Digit Mobile Number");
      return;
    }
    setIsLoading(true);
    setMessage("");
    const res = await sendOTP(phone);
    setIsLoading(false);
    if (res.success) {
      setStep(2);
      setMessage("✅ OTP Sent! Demo OTP - 1234");
    } else setMessage("❌ " + res.message);
  };

  // Phone OTP - Get REAL JWT from backend using phone email
  const handleVerifyOTP = async () => {
    if (otp.length < 4) {
      setMessage("❌ Please Enter OTP - Demo - 1234");
      return;
    }
    setIsLoading(true);
    setMessage("");
    const res = await verifyOTP(phone, otp);
    if (!res.success) {
      setIsLoading(false);
      setMessage("❌ " + res.message);
      return;
    }
    try {
      const email = `${phone}@purpy.com`;
      const password = `Purpy${phone}!`;
      // Try login first, if no account then signup
      let r = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data = await r.json();
      if (!r.ok) {
        r = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Purpy Customer", email, password }),
        });
        data = await r.json();
      }
      if (!r.ok) throw new Error(data.message || "Login failed");
      doLoginSuccess(data.token, {
        ...data.user,
        phone,
        wallet: 1250,
        goldCoins: 320,
        vouchers: [{ code: "PURPY100", discount: 100 }],
      });
    } catch (e) {
      setIsLoading(false);
      setMessage("❌ " + e.message);
    }
  };

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Email Login - REAL backend call - No fake user
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    const email = formData.email.trim();
    const password = formData.password;
    if (!email || !password) {
      setMessage("Please enter an email and password.");
      setIsLoading(false);
      return;
    }
    try {
      const r = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.message || "Login failed");
      doLoginSuccess(data.token, {
        ...data.user,
        wallet: 1250,
        goldCoins: 320,
        vouchers: [{ code: "PURPY100", discount: 100 }],
      });
    } catch (err) {
      setIsLoading(false);
      setMessage("❌ " + err.message);
    }
  };

  if (savedUser) {
    return (
      <main className="login-page">
        <div className="login-top-icons"><span>🥦</span><span>🍎</span><span>🥛</span><span>🛒</span><span>👗</span><span>💄</span><span>📱</span><span>🍫</span></div>
        <div className="login-card" style={{ textAlign: "center" }}>
          <div className="login-logo" style={{ fontSize: 30 }}>{savedUser.name?.[0]?.toUpperCase() || "👤"}</div>
          <h1 style={{ margin: "12px 0 2px", fontSize: 24 }}>Welcome Back, {savedUser.name}! 👋</h1>
          <p style={{ color: "#666", fontSize: 13 }}>You are already logged in</p>
          <div style={{ background: "#f0fdf4", borderRadius: 16, padding: 16, marginTop: 16, textAlign: "left", fontSize: 13, lineHeight: 2 }}>
            <div>👤 <b>Name:</b> {savedUser.name}</div>
            <div>📱 <b>Phone:</b> +91 {savedUser.phone || "Not Added"}</div>
            <div>✉️ <b>Email:</b> {savedUser.email}</div>
            <div>💰 <b>Wallet:</b> ₹{savedUser.wallet || 1250}</div>
            <div>🪙 <b>Gold Coins:</b> {savedUser.goldCoins || 320}</div>
            <div>🎁 <b>Voucher:</b> PURPY100 - ₹100 OFF</div>
          </div>
          <button className="login-btn" onClick={() => navigate("/?view=products")}>Continue Shopping 🛒</button>
          <button className="login-btn" onClick={handleLogout} style={{ background: "#fef2f2", color: "#dc2626", marginTop: 10 }}>Logout 🚪</button>
          <p className="login-copy" style={{ marginTop: 12 }}>© 2026 PURPY • Kakinada</p>
        </div>
      </main>
    );
  }

  return (
    <main className="login-page">
      <div className="login-top-icons"><span>🥦</span><span>🍎</span><span>🥛</span><span>🛒</span><span>👗</span><span>💄</span><span>📱</span><span>🍫</span></div>
      <form className="login-card" onSubmit={tab === "email" ? handleEmailSubmit : (e) => e.preventDefault()}>
        <div className="login-logo-wrap">
          <div className="login-logo">🛒</div>
          <h1>PURPY <span>•</span></h1>
          <p>Kakinada's Fastest Delivery App</p>
          <div className="login-badges"><span>⚡ 10 Min Delivery</span><span>🎁 Free Above ₹499</span></div>
        </div>
        <div className="login-tabs">
          <button type="button" className={tab === "phone" ? "active" : ""} onClick={() => { setTab("phone"); setMessage(""); }}>📱 Phone OTP</button>
          <button type="button" className={tab === "email" ? "active" : ""} onClick={() => { setTab("email"); setMessage(""); }}>✉️ Email</button>
        </div>
        {tab === "phone" ? (
          step === 1 ? (
            <div className="login-body">
              <label>📱 Mobile Number</label>
              <div className="phone-box"><span>+91</span><input type="text" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="Enter Mobile Number" inputMode="numeric" /></div>
              <button type="button" className="login-btn" onClick={handleSendOTP} disabled={isLoading}>{isLoading ? "Sending..." : "Send OTP →"}</button>
              <p className="login-hint">Demo Mode - OTP - <b>1234</b></p>
            </div>
          ) : (
            <div className="login-body">
              <p className="otp-text">OTP Sent to <b>+91 {phone}</b> <span onClick={() => setStep(1)}>Change</span></p>
              <div className="otp-boxes">{[0, 1, 2, 3].map((i) => (<input key={i} value={otp[i] || ""} onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, "").slice(-1); const n = otp.split(""); n[i] = v; setOtp(n.join("")); }} inputMode="numeric" />))}</div>
              <button type="button" className="login-btn" onClick={handleVerifyOTP} disabled={isLoading}>{isLoading ? "Verifying..." : "Verify & Login ✅"}</button>
              <p className="login-hint">Demo OTP - <b onClick={() => setOtp("1234")}>1234 - Auto Fill - Click Here</b></p>
            </div>
          )
        ) : (
          <div className="login-body">
            <label>Email Address</label>
            <input type="text" name="email" placeholder="Enter Email Address" value={formData.email} onChange={handleChange} autoComplete="off" required />
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} autoComplete="off" required />
            <button type="submit" className="login-btn" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          </div>
        )}
        {message && <p className={message.includes("✅") ? "login-success" : "login-error"}>{message}</p>}
        <p className="login-footer">Don't have an account? <Link to="/signup">Sign up</Link></p>
        <p className="login-copy">© 2026 PURPY • Kakinada</p>
      </form>
    </main>
  );
}
export default Login;