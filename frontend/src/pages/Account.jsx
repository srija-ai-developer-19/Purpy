import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

function safeNum(v, def) { const n = Number(v); if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def; return n; }
function normPhone(p) { return String(p || "").replace(/[^0-9]/g, "").slice(-10); }

const GUEST_USER = { name: "Guest", phone: "", email: "", address: "" };

export default function Account() {
  const DEFAULT_USER = { name: "Srija", phone: "99666 12345", email: "", address: "Main Road, Kakinada, Andhra Pradesh - 533001" };
  const [user, setUser] = useState(GUEST_USER);
  const [accounts, setAccounts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(GUEST_USER);
  const [wallet, setWallet] = useState(1250);
  const [coins, setCoins] = useState(125);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddr, setNewAddr] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const isGuest = accounts.length === 0 || !user.phone;

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("purpyUser") || "null");
      let list = JSON.parse(localStorage.getItem("purpyAccounts") || "[]");
      setAccounts(list);
      if (u && u.name && u.phone) {
        const data = { name: u.name || "Srija", phone: u.phone || "", email: u.email || "", address: u.address || "Main Road, Kakinada, Andhra Pradesh - 533001" };
        setUser(data); setForm(data);
      } else if (list[0]) {
        setUser(list[0]); setForm(list[0]); localStorage.setItem("purpyUser", JSON.stringify(list[0]));
      } else {
        setUser(GUEST_USER); setForm(GUEST_USER);
      }
      const w = localStorage.getItem("purpyWallet"); if (w !== null) setWallet(safeNum(w, 1250)); else if (u && u.wallet !== undefined) setWallet(safeNum(u.wallet, 1250));
      const c = localStorage.getItem("purpyCoins"); if (c !== null) setCoins(safeNum(c, 125));
      setOrderCount(JSON.parse(localStorage.getItem("purpyOrders") || "[]").length);
      const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]"); setCartCount(cart.reduce((s, p) => s + (p.quantity || 1), 0));
    } catch (e) {}
  }, []);

  const saveProfile = () => {
    if (isGuest) return alert("Please add an account first.");
    if (!form.name.trim()) return alert("Please enter Name");
    if (!form.phone.trim()) return alert("Please enter Phone");
    const data = { ...user, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim(), wallet, token: user.token || ("purpy-token-" + normPhone(form.phone)) };
    localStorage.setItem("purpyUser", JSON.stringify(data));
    const updated = accounts.map(a => normPhone(a.phone) === normPhone(user.phone) ? data : a);
    localStorage.setItem("purpyAccounts", JSON.stringify(updated)); setAccounts(updated);
    setUser(data); setEdit(false); alert("Profile Saved!");
  };
  // ✅ FIX - LOGOUT - UI Maraledu - Logic Matrame Marcha
  const doLogout = () => {
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
    // ✅ State Kuda Clear - Lekapothe Same Account Kanipisthundhi
    setAccounts([]);
    setUser(GUEST_USER);
    setForm(GUEST_USER);
    setEdit(false);
    setShowAdd(false);
    alert("Logged Out!");
    // ✅ Account Page Ki Kaadhu - Home Ki - Appude Guest Kanipisthadu
    purpyGo(`/?view=home`);
    window.location.reload();
  };
  const switchAccount = (acc) => {
    if (normPhone(acc.phone) === normPhone(user.phone)) return;
    localStorage.setItem("purpyUser", JSON.stringify(acc));
    localStorage.setItem("purpyToken", acc.token || ("purpy-token-" + normPhone(acc.phone)));
    setUser(acc); setForm(acc);
    alert(`Switched to ${acc.name} - ${acc.phone}`);
    purpyGo(`/?view=account`);
  };

  const removeAccount = (acc) => {
    if (!window.confirm(`Remove ${acc.name} - ${acc.phone}?`)) return;
    const updated = accounts.filter(a => normPhone(a.phone) !== normPhone(acc.phone));
    localStorage.setItem("purpyAccounts", JSON.stringify(updated)); setAccounts(updated);
    if (normPhone(acc.phone) === normPhone(user.phone)) {
      if (updated[0]) {
        localStorage.setItem("purpyUser", JSON.stringify(updated[0]));
        localStorage.setItem("purpyToken", updated[0].token || "");
        setUser(updated[0]); setForm(updated[0]);
      } else {
        localStorage.removeItem("purpyUser");
        localStorage.removeItem("purpyToken");
        setUser(GUEST_USER); setForm(GUEST_USER); setEdit(false);
      }
    }
    alert("Account Removed");
  };

  const sendOtp = () => {
    if (!newName.trim()) return alert("Please enter Name");
    if (normPhone(newPhone).length !== 10) return alert("Please enter correct 10-digit number");
    if (accounts.some(a => normPhone(a.phone) === normPhone(newPhone))) return alert("This number is already added - Please Switch");
    setOtpSent(true); alert("OTP Sent to " + newPhone + "\nDemo OTP: 1234");
  };
  const verifyAndAdd = () => {
    if (otp !== "1234") return alert("Wrong OTP - Demo OTP: 1234");
    const newAcc = { name: newName.trim(), phone: newPhone.trim(), email: "", address: newAddr.trim() || "Main Road, Kakinada, Andhra Pradesh - 533001", token: "purpy-token-" + normPhone(newPhone) + "-" + Date.now(), wallet: 0 };
    const updated = [...accounts, newAcc];
    localStorage.setItem("purpyAccounts", JSON.stringify(updated));
    localStorage.setItem("purpyUser", JSON.stringify(newAcc));
    localStorage.setItem("purpyToken", newAcc.token);
    setAccounts(updated); setUser(newAcc); setForm(newAcc);
    setShowAdd(false); setNewName(""); setNewPhone(""); setNewAddr(""); setOtp(""); setOtpSent(false);
    alert(`New Account Added!\n${newAcc.name} - ${newAcc.phone}`);
    purpyGo(`/?view=account`);
  };

  const go = (v) => purpyGo(`/?view=${v}`);
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 12px 30px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>👤 My Account</h2>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "#666" }}>{isGuest ? "Guest Mode • Browse without account • Account needed only for order" : "Your Details • PURPY • Kakinada"}</p>

      {isGuest ? (
        <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 18, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 36 }}>👋</div>
          <b style={{ fontSize: 18, display: "block", marginTop: 6 }}>Hello, Guest!</b>
          <p style={{ fontSize: 12, color: "#666", margin: "6px 0 12px" }}>No account - You can browse full app.<br />Add account only to place an order.</p>
          {/* ⭐ SIGNUP / LOGIN - IKKADA ADD CHESANU - UI SAME ⭐ */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
            <button onClick={() => go("login")} style={{ flex: 1, background: "#111", color: "white", border: "none", padding: "12px 10px", borderRadius: 20, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>🔐 Login</button>
            <button onClick={() => go("signup")} style={{ flex: 1, background: "#ff3d00", color: "white", border: "none", padding: "12px 10px", borderRadius: 20, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>🎉 Signup - Get ₹100 Free</button>
          </div>
          <p style={{ fontSize: 11, color: "#888", margin: "0 0 10px" }}>OR Continue with Guest Account</p>
          <button onClick={() => setShowAdd(true)} style={{ background: "#16a34a", color: "white", border: "none", padding: "11px 20px", borderRadius: 20, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>➕ + Add Account to Order</button>
          <button onClick={() => go("home")} style={{ marginLeft: 8, background: "#111", color: "white", border: "none", padding: "11px 20px", borderRadius: 20, fontWeight: 800, cursor: "pointer", fontSize: 13 }}>🛍️ Browse Items</button>
        </div>
      ) : (
        <div style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", borderRadius: 18, padding: 20, color: "white", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "white", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, flexShrink: 0 }}>{(user.name || "S").charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1 }}><b style={{ fontSize: 20, display: "block" }}>{user.name}</b><span style={{ fontSize: 12, opacity: 0.9 }}>📞 {user.phone}</span><br /><span style={{ fontSize: 12, opacity: 0.9 }}>📍 {user.address}</span></div>
          <button onClick={() => setEdit(!edit)} style={{ background: "white", color: "#16a34a", border: "none", padding: "8px 14px", borderRadius: 20, fontWeight: 900, cursor: "pointer", fontSize: 12 }}>{edit ? "Cancel" : "✏️ Edit"}</button>
        </div>
      )}

      {edit && !isGuest && (
        <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 14, padding: 14, marginTop: 12 }}>
          <b style={{ fontSize: 14 }}>✏️ Edit Details</b>
          <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginTop: 10 }}>👤 Full Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Srija" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 4, boxSizing: "border-box" }} />
          <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginTop: 10 }}>📞 Phone Number</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+ ]/g, "") })} placeholder="Ex: 99666 12345" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 4, boxSizing: "border-box" }} />
          <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginTop: 10 }}>📧 Email (Optional)</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Ex: srija@gmail.com" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 4, boxSizing: "border-box" }} />
          <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginTop: 10 }}>📍 Delivery Address</label>
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} placeholder="Full Address - Kakinada" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 4, boxSizing: "border-box" }} />
          <button onClick={saveProfile} style={{ marginTop: 12, width: "100%", background: "#16a34a", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>✅ Save Details</button>
        </div>
      )}
      {!edit && !isGuest && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, marginTop: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>👤 Name</span><b style={{ fontSize: 13 }}>{user.name}</b></div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>📞 Phone</span><b style={{ fontSize: 13 }}>{user.phone}</b></div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>📧 Email</span><b style={{ fontSize: 13 }}>{user.email || "Not Added - Add in Edit"}</b></div>
          <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "#666", fontSize: 13 }}>📍 Address</span><b style={{ fontSize: 13, textAlign: "right" }}>{user.address}</b></div>
        </div>
      )}
      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, marginTop: 14, padding: 14 }}>
        <b style={{ fontSize: 14 }}>🔄 My Accounts - {accounts.length === 0 ? "Guest Mode - No Account" : `${accounts.length} - Trusted Only ✅`}</b>
        <p style={{ margin: "4px 0 10px", fontSize: 11, color: "#666" }}>{accounts.length === 0 ? "No account - Browse freely. Add account to order." : "Only Registered numbers"}</p>
        {accounts.map((a) => (
          <div key={a.phone} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", border: normPhone(a.phone) === normPhone(user.phone) ? "2px solid #16a34a" : "1px solid #eee", borderRadius: 12, marginBottom: 8, background: normPhone(a.phone) === normPhone(user.phone) ? "#f0fdf4" : "white" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#16a34a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{(a.name || "S").charAt(0).toUpperCase()}</div>
            <div style={{ flex: 1 }}><b style={{ fontSize: 13, display: "block" }}>{a.name}</b><span style={{ fontSize: 11, color: "#666" }}>{a.phone} {normPhone(a.phone) === normPhone(user.phone) ? "• Active ✅" : ""}</span></div>
            {normPhone(a.phone) !== normPhone(user.phone) && <button onClick={() => switchAccount(a)} style={{ background: "#16a34a", color: "white", border: "none", padding: "7px 12px", borderRadius: 20, fontWeight: 800, cursor: "pointer", fontSize: 11 }}>Switch</button>}
            <button onClick={() => removeAccount(a)} style={{ background: "white", color: "#dc2626", border: "1px solid #fecaca", padding: "7px 10px", borderRadius: 20, fontWeight: 800, cursor: "pointer", fontSize: 11 }}>Remove</button>
          </div>
        ))}
        <button onClick={() => setShowAdd(!showAdd)} style={{ width: "100%", background: "#111", color: "white", border: "none", padding: "11px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>➕ + Add Another Account</button>
        {showAdd && (
          <div style={{ marginTop: 12, background: "#f8fdf8", border: "1px solid #bbf7d0", borderRadius: 12, padding: 12 }}>
            <b style={{ fontSize: 13 }}>➕ Add New Trusted Account</b>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name - Ex: Amma" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #ddd", marginTop: 8, boxSizing: "border-box" }} />
            <input value={newPhone} onChange={(e) => setNewPhone(e.target.value.replace(/[^0-9+ ]/g, ""))} placeholder="New Phone - 10 digits" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #ddd", marginTop: 8, boxSizing: "border-box" }} />
            <input value={newAddr} onChange={(e) => setNewAddr(e.target.value)} placeholder="Address (Optional)" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #ddd", marginTop: 8, boxSizing: "border-box" }} />
            {!otpSent ? <button onClick={sendOtp} style={{ width: "100%", background: "#16a34a", color: "white", border: "none", padding: "11px", borderRadius: 10, fontWeight: 900, cursor: "pointer", marginTop: 8 }}>📱 Send OTP</button> : (<><input value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))} placeholder="Enter OTP - Demo: 1234" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #ddd", marginTop: 8, boxSizing: "border-box" }} /><button onClick={verifyAndAdd} style={{ width: "100%", background: "#16a34a", color: "white", border: "none", padding: "11px", borderRadius: 10, fontWeight: 900, cursor: "pointer", marginTop: 8 }}>✅ Verify & Add Account</button></>)}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 14 }}>
        <div onClick={() => go("wallet")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>💰</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>Wallet</b><span style={{ fontSize: 12, color: "#16a34a", fontWeight: 800 }}>₹{wallet} • {coins} Coins</span></div>
        <div onClick={() => go("orders")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>📦</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>My Orders</b><span style={{ fontSize: 12, color: "#666" }}>{orderCount} Orders • View</span></div>
        <div onClick={() => go("cart")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>🛒</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>My Cart</b><span style={{ fontSize: 12, color: "#666" }}>{cartCount} Items</span></div>
        <div onClick={() => go("settings")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>⚙️</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>Settings</b><span style={{ fontSize: 12, color: "#666" }}>Language • Help</span></div>
      </div>
      {!isGuest && <button onClick={doLogout} style={{ marginTop: 14, width: "100%", background: "#dc2626", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>🚪 Logout - {user.name}</button>}
      <button onClick={() => go("home")} style={{ marginTop: 10, width: "100%", background: "#111", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>← Back to Home</button>
    </div>
  );
}