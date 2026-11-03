import { purpyGo } from "../App.jsx";
import { useState, useEffect } from "react";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

export default function Header({ onOpenAI }) {
  const [walletTick, setWalletTick] = useState(0);

  useEffect(() => {
    const onStorage = () => setWalletTick(t => t + 1);
    window.addEventListener("storage", onStorage);
    const id = setInterval(() => {
      setWalletTick(t => t + 0.0001);
    }, 1000);
    return () => { window.removeEventListener("storage", onStorage); clearInterval(id); }
  }, []);

  let user = null;
  try {
    const raw = localStorage.getItem("purpyUser");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.name === "string" && parsed.name.trim() !== "" && isNaN(Number(parsed.name))) user = parsed;
    }
  } catch (e) { user = null; }

  const displayName = user ? user.name.split(" ")[0] : "";

  // WALLET - LOGIN LEKAPOTHE 0 - LOGIN AYITHE 350 - FIXED
  let displayWallet = 0;
  if (user) {
    try {
      // Priority: phone specific > general > user object
      let found = null;
      
      if (user?.phone) {
        const w2 = localStorage.getItem(`purpyWallet_${user.phone}`);
        if (w2 !== null && w2 !== "" && w2 !== "0") {
          found = safeNum(w2, null);
        }
      }
      
      if (found === null) {
        const w1 = localStorage.getItem("purpyWallet");
        if (w1 !== null && w1 !== "" && w1 !== "0") {
          found = safeNum(w1, null);
        }
      }
      
      if (found === null && user.wallet !== undefined && user.wallet !== 0) {
        found = safeNum(user.wallet, null);
      }

      // First time login - 350 bonus
      if (found === null || found === 0) {
        displayWallet = 350;
        localStorage.setItem("purpyWallet", "350");
        if (user.phone) localStorage.setItem(`purpyWallet_${user.phone}`, "350");
        user.wallet = 350;
        localStorage.setItem("purpyUser", JSON.stringify(user));
      } else {
        displayWallet = found;
      }
    } catch {
      displayWallet = 350;
    }
  }

  const finalWallet = user ? displayWallet : 0;

  const go = (v) => purpyGo(`/?view=${v}`);

  const getCart = () => {
    if (!user) return [];
    try {
      const key = user.phone ? `purpyCart_${user.phone}` : "purpyCart";
      const c = JSON.parse(localStorage.getItem(key) || localStorage.getItem("purpyCart") || "[]");
      return Array.isArray(c) ? c : [];
    } catch { return []; }
  };

  const getOrders = () => {
    if (!user) return [];
    try {
      const key = user.phone ? `purpyOrders_${user.phone}` : "purpyOrders";
      let o = JSON.parse(localStorage.getItem(key) || "[]");
      if (o.length === 0) o = JSON.parse(localStorage.getItem("purpyOrders") || "[]");
      return Array.isArray(o) ? o : [];
    } catch { return []; }
  };

  const getWishlist = () => {
    if (!user) return [];
    try {
      const key = user.phone ? `purpyWishlist_${user.phone}` : "purpyWishlist";
      return JSON.parse(localStorage.getItem(key) || localStorage.getItem("purpyWishlist") || "[]");
    } catch { return []; }
  };

  const cart = getCart();
  const cartCount = cart.reduce((s, p) => s + (p.quantity || 1), 0);
  const wishCount = getWishlist().length;
  const orderCount = getOrders().length;

  const finalCartCount = user ? cartCount : 0;
  const finalWishCount = user ? wishCount : 0;
  const finalOrderCount = user ? orderCount : 0;

  return (
    <header style={{ background: "white", borderBottom: "1px solid #bbf7d0", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 20 }}>
      <b onClick={() => go("home")} style={{ cursor: "pointer", fontSize: 20, fontWeight: 900, color: "#14532d", background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", padding: "7px 18px", borderRadius: 20, border: "2px solid #16a34a", display: "inline-block" }}>🛒 PURPY.</b>
      <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <span onClick={() => go("home")} style={{ cursor: "pointer" }}>Home</span>
        <span onClick={onOpenAI} style={{ cursor: "pointer", background: "#e8f5e9", padding: "4px 8px", borderRadius: 12 }}>🤖 AI</span>
        <span onClick={() => go("orders")} style={{ cursor: "pointer", background: "#fef3c7", border: "1px solid #facc15", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>📦 Orders {finalOrderCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{finalOrderCount}</span>}</span>
        <span onClick={() => go("cart")} style={{ cursor: "pointer" }}>🛒 Cart {finalCartCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{finalCartCount}</span>}</span>
        <span onClick={() => go("wishlist")} style={{ cursor: "pointer" }}>❤️ {finalWishCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{finalWishCount}</span>}</span>
        <span onClick={() => go("wallet")} style={{ cursor: "pointer", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 10px", borderRadius: 20, fontWeight: 800, color: "#15803d" }}>💰 ₹{finalWallet}</span>
        <span onClick={() => go("settings")} style={{ cursor: "pointer", background: "#f3f4f6", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>⚙️ Settings</span>
        {user ? <span onClick={() => go("account")} style={{ cursor: "pointer", background: "#111", color: "white", padding: "5px 12px", borderRadius: 20, fontWeight: 700 }}>👤 {displayName}</span> : <span onClick={() => go("account")} style={{ cursor: "pointer", background: "#111", color: "white", padding: "5px 12px", borderRadius: 20, fontWeight: 700 }}>👤 Account</span>}
      </div>
    </header>
  );
}