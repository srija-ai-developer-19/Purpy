import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

export default function Account() {
  const DEFAULT_USER = { name: "Srija", phone: "99666 12345", email: "", address: "Main Road, Kakinada, Andhra Pradesh - 533001" };
  const [user, setUser] = useState(DEFAULT_USER);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(DEFAULT_USER);
  const [wallet, setWallet] = useState(1250);
  const [coins, setCoins] = useState(125);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (u && u.name) {
        const data = { name: u.name || "Srija", phone: u.phone || "99666 12345", email: u.email || "", address: u.address || "Main Road, Kakinada, Andhra Pradesh - 533001" };
        setUser(data); setForm(data);
      }
      const w = localStorage.getItem("purpyWallet");
      if (w !== null) setWallet(safeNum(w, 1250));
      else if (u && u.wallet !== undefined) setWallet(safeNum(u.wallet, 1250));
      const c = localStorage.getItem("purpyCoins");
      if (c !== null) setCoins(safeNum(c, 125));
      setOrderCount(JSON.parse(localStorage.getItem("purpyOrders") || "[]").length);
      const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
      setCartCount(cart.reduce((s, p) => s + (p.quantity || 1), 0));
    } catch (e) {}
  }, []);
  const saveProfile = () => {
    if (!form.name.trim()) return alert("⚠️ Please enter Name");
    if (!form.phone.trim()) return alert("⚠️ Please enter Phone");
    const data = { ...user, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim(), wallet };
    localStorage.setItem("purpyUser", JSON.stringify(data));
    setUser(data); setEdit(false);
    alert("✅ Profile Saved!");
  };
  const go = (v) => purpyGo(`/?view=${v}`);
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 12px 30px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>👤 My Account</h2>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "#666" }}>Your Details • PURPY • Kakinada</p>
      <div style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", borderRadius: 18, padding: 20, color: "white", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "white", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, flexShrink: 0 }}>{(user.name || "S").charAt(0).toUpperCase()}</div>
        <div style={{ flex: 1 }}><b style={{ fontSize: 20, display: "block" }}>{user.name}</b><span style={{ fontSize: 12, opacity: 0.9 }}>📞 {user.phone}</span><br /><span style={{ fontSize: 12, opacity: 0.9 }}>📍 {user.address}</span></div>
        <button onClick={() => setEdit(!edit)} style={{ background: "white", color: "#16a34a", border: "none", padding: "8px 14px", borderRadius: 20, fontWeight: 900, cursor: "pointer", fontSize: 12 }}>{edit ? "Cancel" : "✏️ Edit"}</button>
      </div>
      {edit && (
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
      {!edit && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, marginTop: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>👤 Name</span><b style={{ fontSize: 13 }}>{user.name}</b></div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>📞 Phone</span><b style={{ fontSize: 13 }}>{user.phone}</b></div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#666", fontSize: 13 }}>📧 Email</span><b style={{ fontSize: 13 }}>{user.email || "Not Added - Add in Edit"}</b></div>
          <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "#666", fontSize: 13 }}>📍 Address</span><b style={{ fontSize: 13, textAlign: "right" }}>{user.address}</b></div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 14 }}>
        <div onClick={() => go("wallet")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>💰</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>Wallet</b><span style={{ fontSize: 12, color: "#16a34a", fontWeight: 800 }}>₹{wallet} • {coins} Coins</span></div>
        <div onClick={() => go("orders")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>📦</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>My Orders</b><span style={{ fontSize: 12, color: "#666" }}>{orderCount} Orders • View</span></div>
        <div onClick={() => go("cart")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>🛒</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>My Cart</b><span style={{ fontSize: 12, color: "#666" }}>{cartCount} Items</span></div>
        <div onClick={() => go("settings")} style={{ cursor: "pointer", background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, textAlign: "center" }}><div style={{ fontSize: 24 }}>⚙️</div><b style={{ fontSize: 13, display: "block", marginTop: 4 }}>Settings</b><span style={{ fontSize: 12, color: "#666" }}>Language • Help</span></div>
      </div>
      <button onClick={() => go("home")} style={{ marginTop: 16, width: "100%", background: "#111", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>← Back to Home</button>
    </div>
  );
}