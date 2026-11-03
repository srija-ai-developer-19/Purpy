import { purpyGo } from "../App.jsx";
import { useState } from "react";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

export default function Wallet() {
  const [balance, setBalance] = useState(() => {
    try {
      const rawUser = localStorage.getItem("purpyUser");
      if (!rawUser) return 0; // LOGIN LEKAPOTHE 0
      const user = JSON.parse(rawUser);
      if (!user || !user.phone) return 0;

      const ub = localStorage.getItem(`purpyWallet_${user.phone}`);
      if (ub !== null) return safeNum(ub, 0);

      const w = localStorage.getItem("purpyWallet");
      if (w !== null) return safeNum(w, 0);

      return 350; // First login
    } catch {
      return 0;
    }
  });

  const rawUser = localStorage.getItem("purpyUser");
  const isLoggedIn = !!rawUser;

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <h2 style={{ margin: "12px 0 8px" }}>Login Required</h2>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Login ayithe ne Wallet lo ₹350 welcome bonus vasthundi</p>
        <button onClick={() => purpyGo("/?view=account")} style={{ padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>
          Login Now - Get ₹350
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "16px 12px 120px" }}>
      <span onClick={() => purpyGo("/?view=home")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700, fontSize: 14 }}>← Back to Home</span>
      <h2 style={{ margin: "12px 0 4px", fontSize: 20, fontWeight: 900 }}>💰 My Wallet</h2>
      <p style={{ fontSize: 11, color: "#888", margin: "0 0 12px" }}>Login bonus - Not free for guests</p>

      <div style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)", borderRadius: 16, padding: 20, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.9 }}>Total Balance</div>
        <div style={{ fontSize: 36, fontWeight: 900 }}>₹{balance}</div>
        <div style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "4px 10px", borderRadius: 10, marginTop: 6 }}>
          {balance} Coins • Welcome Bonus Included • Login User Only
        </div>
      </div>

      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 12, marginTop: 14 }}>
        <b style={{ fontSize: 12, color: "#92400e" }}>💡 How Wallet Works?</b>
        <div style={{ fontSize: 11, color: "#78350f", marginTop: 6, lineHeight: 1.6 }}>
          - Login ayithe - ₹350 Welcome Bonus<br/>
          - Login lekunda - ₹0 - No free money<br/>
          - Order cashback 5% - Wallet lo add avthundi<br/>
          - Guest ki wallet undadu
        </div>
      </div>

      <button onClick={() => purpyGo("/?view=home")} style={{ width: "100%", marginTop: 20, padding: 13, background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800 }}>
        Shop Now - Balance ₹{balance}
      </button>
    </div>
  );
}