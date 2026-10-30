import { useState, useEffect } from "react";
import { purpyGo, API_URL } from "../App.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [alreadyUser, setAlreadyUser] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("purpyUser") || "null");
      const list = JSON.parse(localStorage.getItem("purpyAccounts") || "[]");
      if (u && (u.phone || u.email)) setAlreadyUser(u);
      else if (list[0] && (list[0].phone || list[0].email)) setAlreadyUser(list[0]);
      else setAlreadyUser(null);
    } catch (e) { setAlreadyUser(null); }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Please fill Name, Email, Phone, Password");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter correct Email - Ex: ramu@gmail.com");
      return;
    }
    if (phone.length < 10) {
      setError("Enter correct 10 digit phone number");
      return;
    }
    setLoading(true);
    setError("");
    const user = { name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), wallet: 1250, goldCoins: 320, address: "Main Road, Kakinada, Andhra Pradesh - 533001" };
    try {
      await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name, email: user.email, phone: user.phone, password }),
      }).catch(() => {});
    } catch (err) {}
    try {
      localStorage.setItem("purpyUser", JSON.stringify(user));
      localStorage.setItem("purpyLoggedIn", "yes");
      const list = JSON.parse(localStorage.getItem("purpyAccounts") || "[]");
      if (!list.some((a) => String(a.phone).replace(/[^0-9]/g, "").slice(-10) === phone.replace(/[^0-9]/g, "").slice(-10))) {
        list.push(user);
        localStorage.setItem("purpyAccounts", JSON.stringify(list));
      }
    } catch (err) {}
    setLoading(false);
    setSuccess(true);
  };

  const goHome = () => { setSuccess(false); purpyGo("/?view=home"); };

  // ✅ LOGOUT FUNCTION - IKKADA UNDHI
  const handleLogout = () => {
    if (!window.confirm("Logout?")) return;
    try {
      localStorage.removeItem("purpyUser");
      localStorage.removeItem("purpyAccounts");
      localStorage.removeItem("purpyAllUsers");
      localStorage.removeItem("purpyLoggedIn");
      localStorage.removeItem("purpyToken");
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
    } catch (e) {}
    setAlreadyUser(null);
    alert("Logged Out!");
    window.location.reload();
  };

  // ✅ 1 - ALREADY LOGGED IN SCREEN - LOGOUT UNDHI
  if (alreadyUser) {
    return (
      <div style={{ maxWidth: 420, margin: "20px auto", padding: "0 16px 30px" }}>
        <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #eee", textAlign: "center" }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, margin: "0 auto" }}>
            {(alreadyUser.name || "S").charAt(0).toUpperCase()}
          </div>
          <h2 style={{ margin: "14px 0 4px", fontSize: 20, fontWeight: 900 }}>Already Logged In</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
            <b style={{ color: "#111" }}>{alreadyUser.name}</b><br />
            {alreadyUser.email || ""}<br />
            {alreadyUser.phone}<br />
            You are already signed in.
          </p>
          <button onClick={() => purpyGo("/?view=account")} style={{ marginTop: 18, width: "100%", background: "#16a34a", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>Go to My Account</button>
          <button onClick={() => purpyGo("/?view=home")} style={{ marginTop: 10, width: "100%", background: "#111", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>Continue Shopping</button>
          <button onClick={handleLogout} style={{ marginTop: 10, width: "100%", background: "#dc2626", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>Log Out</button>
          <p style={{ fontSize: 12, color: "#999", margin: "12px 0 0" }}>To create a new account, please logout first.</p>
        </div>
      </div>
    );
  }

  // ✅ 2 - SIGNUP FORM - KINDHA KUDA LOGOUT BUTTON PETTA
  return (
    <div style={{ maxWidth: 420, margin: "20px auto", padding: "0 16px 30px" }}>
      <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #eee" }}>
        <div style={{ textAlign: "center" }}>
          <b style={{ fontSize: 28, color: "#14532d" }}>PURPY.</b>
          <h2 style={{ margin: "10px 0 4px", fontSize: 20, fontWeight: 900 }}>Create Account</h2>
          <p style={{ margin: 0, fontSize: 13, color: "#666" }}>Kakinada's Fastest Delivery - Join PURPY.</p>
        </div>
        <form onSubmit={handleSignup} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Ramu" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none", fontSize: 15, marginTop: 6, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex: ramu@gmail.com" type="email" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none", fontSize: 15, marginTop: 6, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="10 Digit Mobile Number" inputMode="numeric" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none", fontSize: 15, marginTop: 6, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Create Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none", fontSize: 15, marginTop: 6, boxSizing: "border-box" }} />
          </div>
          {error && <p style={{ margin: 0, color: "#dc2626", fontSize: 13, fontWeight: 600, background: "#fef2f2", padding: "10px 12px", borderRadius: 10 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background: loading ? "#86efac" : "#16a34a", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, fontSize: 16, cursor: "pointer", marginTop: 4 }}>
            {loading ? "Creating Account..." : "Sign Up - Create Account"}
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: 13, color: "#666", marginTop: 16 }}>
          Already have account? <span onClick={() => purpyGo("/?view=login")} style={{ color: "#16a34a", fontWeight: 800, cursor: "pointer" }}>Login</span>
        </p>
        <p onClick={() => purpyGo("/?view=home")} style={{ textAlign: "center", fontSize: 13, color: "#16a34a", fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Skip - Continue Without Signup</p>
        <button onClick={handleLogout} style={{ marginTop: 16, width: "100%", background: "white", color: "#dc2626", border: "1px solid #dc2626", padding: "13px", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>Log Out</button>
      </div>
      {success && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "white", width: "100%", maxWidth: 360, borderRadius: 20, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 60 }}>🎉</div>
            <h2 style={{ margin: "10px 0 6px", fontSize: 20, fontWeight: 900 }}>Signup Successful!</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
              Welcome <b style={{ color: "#16a34a" }}>{name}</b>!<br />
              Email: {email}<br />
              Your Account Created.<br />
              Wallet - Rs.1250 | Coins - 320 Added!
            </p>
            <button onClick={goHome} style={{ marginTop: 18, width: "100%", background: "#16a34a", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, fontSize: 16, cursor: "pointer" }}>
              OK - Go to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}