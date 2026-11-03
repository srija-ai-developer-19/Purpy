import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

export default function Wallet() {
  const [balance, setBalance] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (user?.phone) {
        const ub = localStorage.getItem(`purpyWallet_${user.phone}`);
        if (ub !== null) return safeNum(ub, 250);
      }
      const w = localStorage.getItem("purpyWallet");
      if (w !== null) return safeNum(w, 250);
      if (user?.wallet !== undefined) return safeNum(user.wallet, 250);
      return 250;
    } catch { return 250; }
  });

  const [addAmount, setAddAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  // SAVE TO ALL KEYS - HEADER KI KUDA VELTHUNDI
  const saveWallet = (newBalance) => {
    const bal = safeNum(newBalance, 0);
    setBalance(bal);
    
    try {
      // 1. Main key
      localStorage.setItem("purpyWallet", String(bal));
      
      // 2. User specific key
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (user?.phone) {
        localStorage.setItem(`purpyWallet_${user.phone}`, String(bal));
        // user object lo kuda update
        user.wallet = bal;
        localStorage.setItem("purpyUser", JSON.stringify(user));
      }
      
      // Force header update - storage event trigger
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("purpyWalletUpdate", { detail: bal }));
    } catch {}
  };

  const handleAddMoney = () => {
    let amt = 0;
    if (custom !== "") amt = safeNum(custom, 0);
    else amt = safeNum(addAmount, 0);

    if (amt < 10) {
      alert("Minimum ₹10 add cheyyali");
      return;
    }

    const newBal = balance + amt;
    saveWallet(newBal);
    setCustom("");
    setShowAdd(false);
    alert(`₹${amt} Added! New Balance: ₹${newBal}`);
    // Header update kosam reload
    setTimeout(() => window.location.reload(), 300);
  };

  const quickAmounts = [100, 200, 500, 1000];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2 style={{ margin: "0 0 4px" }}>💰 My Wallet</h2>
      <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px" }}>PURPY Wallet • Kakinada • Safe & Secure</p>

      {/* BALANCE CARD */}
      <div style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", borderRadius: 16, padding: 20, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.9 }}>Total Balance</div>
        <div style={{ fontSize: 32, fontWeight: 900, margin: "4px 0" }}>₹{balance}</div>
        <div style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "2px 8px", borderRadius: 10 }}>
          💰 {balance} PURPY Coins • 1 Coin = ₹1 • Can be used in Orders
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={() => setShowAdd(!showAdd)} style={{ flex: 1, background: "white", color: "#16a34a", border: "none", padding: "10px", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>
            + Add Money
          </button>
          <button onClick={() => purpyGo("/?view=home")} style={{ flex: 1, background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid white", padding: "10px", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>
            Shop Now
          </button>
        </div>
      </div>

      {/* ADD MONEY SECTION - NUVVU SCREENSHOT LO CHUPINCHINA SECTION */}
      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 12, display: showAdd ? "block" : "block" }}>
        <b style={{ fontSize: 13 }}>Add Money - UPI / Card</b>
        
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {quickAmounts.map(a => (
            <button
              key={a}
              onClick={() => { setAddAmount(a); setCustom(""); }}
              style={{
                padding: "8px 16px", borderRadius: 20, border: addAmount === a && custom === "" ? "2px solid #16a34a" : "1px solid #ddd",
                background: addAmount === a && custom === "" ? "#f0fdf4" : "white",
                fontWeight: 700, cursor: "pointer", fontSize: 12
              }}
            >
              ₹{a}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Custom Amount - Ex: 500"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 10, fontSize: 13, boxSizing: "border-box" }}
        />

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button
            onClick={handleAddMoney}
            style={{ flex: 1, background: "#16a34a", color: "white", border: "none", padding: "12px", borderRadius: 10, fontWeight: 900, cursor: "pointer" }}
          >
            Add ₹{custom !== "" ? (safeNum(custom, 0) || 0) : addAmount} - Pay
          </button>
          <button onClick={() => { setShowAdd(false); setCustom(""); }} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700, cursor: "pointer" }}>
            Cancel
          </button>
        </div>

        <div style={{ fontSize: 10, color: "#888", marginTop: 8 }}>
          🔒 Safe - UPI / Card / NetBanking - Instant credit - Min ₹10
        </div>
      </div>

      {/* INFO */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20, textAlign: "center", fontSize: 11, color: "#666" }}>
        <div><div style={{ fontSize: 18 }}>🪙</div><b>Earn Coins</b><br/>Every Order - 5%</div>
        <div><div style={{ fontSize: 18 }}>💳</div><b>Use Wallet</b><br/>Use in Checkout</div>
        <div><div style={{ fontSize: 18 }}>↩️</div><b>Refund</b><br/>Instant to Wallet</div>
      </div>

      <button onClick={() => purpyGo("/?view=home")} style={{ width: "100%", marginTop: 20, padding: 12, background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>
        ← Back to Home - Balance ₹{balance}
      </button>
    </div>
  );
}