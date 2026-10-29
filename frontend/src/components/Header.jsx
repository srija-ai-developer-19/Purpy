import { purpyGo } from "../App.jsx";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

export default function Header({ onOpenAI }) {
  let user = null;
  try {
    const raw = JSON.parse(localStorage.getItem("purpyUser") || "null");
    if (raw && typeof raw === "object" && typeof raw.name === "string" && raw.name.trim() !== "" && isNaN(Number(raw.name))) user = raw;
  } catch (e) { user = null; }
  const displayName = user ? user.name.split(" ")[0] : "";
  let displayWallet = user ? safeNum(user.wallet, 1250) : 1250;
  try { const w = localStorage.getItem("purpyWallet"); if (w !== null) displayWallet = safeNum(w, 1250); } catch (e) {}
  const go = (v) => purpyGo(`/?view=${v}`);
  const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
  const cartCount = cart.reduce((s, p) => s + (p.quantity || 1), 0);
  const wishCount = JSON.parse(localStorage.getItem("purpyWishlist") || "[]").length;
  const orderCount = JSON.parse(localStorage.getItem("purpyOrders") || "[]").length;
  return (
    <header style={{ background: "white", borderBottom: "1px solid #bbf7d0", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 20 }}>
      <b onClick={() => go("home")} style={{ cursor: "pointer", fontSize: 20, fontWeight: 900, color: "#14532d", background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", padding: "7px 18px", borderRadius: 20, border: "2px solid #16a34a", display: "inline-block" }}>🛒 PURPY.</b>
      <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <span onClick={() => go("home")} style={{ cursor: "pointer" }}>Home</span>
        <span onClick={onOpenAI} style={{ cursor: "pointer", background: "#e8f5e9", padding: "4px 8px", borderRadius: 12 }}>🤖 AI</span>
        <span onClick={() => go("orders")} style={{ cursor: "pointer", background: "#fef3c7", border: "1px solid #facc15", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>📦 Orders {orderCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{orderCount}</span>}</span>
        <span onClick={() => go("cart")} style={{ cursor: "pointer" }}>🛒 Cart {cartCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{cartCount}</span>}</span>
        <span onClick={() => go("wishlist")} style={{ cursor: "pointer" }}>❤️ {wishCount > 0 && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 10 }}>{wishCount}</span>}</span>
        <span onClick={() => go("wallet")} style={{ cursor: "pointer", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 10px", borderRadius: 20, fontWeight: 800, color: "#15803d" }}>💰 ₹{displayWallet}</span>
        <span onClick={() => go("settings")} style={{ cursor: "pointer", background: "#f3f4f6", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>⚙️ Settings</span>
        {user ? <span onClick={() => go("account")} style={{ cursor: "pointer", background: "#111", color: "white", padding: "5px 12px", borderRadius: 20, fontWeight: 700 }}>👤 {displayName}</span> : <span onClick={() => go("account")} style={{ cursor: "pointer", background: "#111", color: "white", padding: "5px 12px", borderRadius: 20, fontWeight: 700 }}>👤 Account</span>}
      </div>
    </header>
  );
}