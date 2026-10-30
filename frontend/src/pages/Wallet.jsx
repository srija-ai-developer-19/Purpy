import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

function safeNum(v, def) {
  const n = Number(v);
  if (v === null || v === undefined || v === "" || v === "NaN" || isNaN(n) || !isFinite(n)) return def;
  return n;
}

// ✅ Okate Chota Nunchi Balance Techukune Function
function getWallet() {
  try {
    const raw = localStorage.getItem("purpyWallet");
    if (raw) {
      // Kotha Format: { balance, coins }
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          balance: safeNum(parsed.balance, 1250),
          coins: safeNum(parsed.coins, 125),
        };
      }
      // Pata Format: "1250" - String Ga Unte
      return { balance: safeNum(raw, 1250), coins: safeNum(localStorage.getItem("purpyCoins"), 125) };
    }
    const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
    if (user && user.wallet !== undefined) {
      return { balance: safeNum(user.wallet, 1250), coins: safeNum(user.coins, 125) };
    }
  } catch (e) {}
  return { balance: 1250, coins: 125 };
}

export default function Wallet() {
  const [balance, setBalance] = useState(1250);
  const [coins, setCoins] = useState(125);
  const [showAdd, setShowAdd] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const w = getWallet();
    setBalance(w.balance);
    setCoins(w.coins);
    // Okate Format Lo Save - Malli Thappu Rakunda
    localStorage.setItem("purpyWallet", JSON.stringify(w));
  }, []);

  const save = (bal, cn) => {
    const b = safeNum(bal, 1250);
    const cc = safeNum(cn, 125);
    setBalance(b);
    setCoins(cc);
    localStorage.setItem("purpyWallet", JSON.stringify({ balance: b, coins: cc }));
    try {
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (user) {
        user.wallet = b;
        user.coins = cc;
        localStorage.setItem("purpyUser", JSON.stringify(user));
      }
    } catch (e) {}
  };

  const addMoney = (amt) => {
    const a = safeNum(amt, 0);
    if (!a || a < 10) return alert("⚠️ Please enter Amount - Minimum ₹10");
    if (a > 10000) return alert("⚠️ Maximum ₹10000 at a time");
    const nb = safeNum(balance, 1250) + a;
    save(nb, coins);
    try {
      const txns = JSON.parse(localStorage.getItem("purpyWalletTxns") || "[]");
      const list = Array.isArray(txns) ? txns : [];
      list.unshift({ id: Date.now(), title: "Money Added - UPI", amt: `+₹${a}`, time: "Just Now", type: "credit" });
      localStorage.setItem("purpyWalletTxns", JSON.stringify(list));
    } catch (e) {}
    setShowAdd(false);
    setAmount("");
    alert(`✅ ₹${a} Added! New Balance - ₹${nb}`);
  };

  const txns = (() => { try { const t = JSON.parse(localStorage.getItem("purpyWalletTxns") || "[]"); return Array.isArray(t) ? t : []; } catch (e) { return []; } })();
  const defaultTxns = [
    { title: "Welcome Bonus - PURPY", amt: "+₹1250", time: "Signup Bonus", type: "credit" },
    { title: "PURPY Coins - 125 Coins", amt: "+125 Coins", time: "Every Order - 5% Coins", type: "credit" },
    { title: "First Order Offer - PURPY100", amt: "-₹100", time: "Coupon Applied", type: "debit" },
  ];
  const allTxns = txns.length > 0 ? txns : defaultTxns;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 12px 30px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>💰 My Wallet</h2>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "#666" }}>PURPY Wallet • Kakinada • Safe & Secure</p>
      <div style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", borderRadius: 18, padding: 20, color: "white" }}>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>Total Balance</p>
        <b style={{ fontSize: 38, display: "block", margin: "6px 0 2px" }}>₹{safeNum(balance, 1250)}</b>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>🪙 {safeNum(coins, 125)} PURPY Coins • 1 Coin = ₹1 • Can be used in Orders</p>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={() => setShowAdd(true)} style={{ flex: 1, background: "white", color: "#16a34a", border: "none", padding: "11px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>+ Add Money</button>
          <button onClick={() => purpyGo("/?view=items")} style={{ flex: 1, background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid white", padding: "11px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>🛒 Shop Now</button>
        </div>
      </div>
      {showAdd && (
        <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 14, padding: 14, marginTop: 12 }}>
          <b style={{ fontSize: 14 }}>Add Money - UPI / Card</b>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {[100, 200, 500, 1000].map((a) => (<button key={a} onClick={() => setAmount(String(a))} style={{ flex: 1, padding: "8px", borderRadius: 10, border: String(amount) === String(a) ? "2px solid #16a34a" : "1px solid #ddd", background: String(amount) === String(a) ? "#f0fdf4" : "white", fontWeight: 800, cursor: "pointer" }}>₹{a}</button>))}
          </div>
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" placeholder="Custom Amount - Ex: 500" style={{ width: "100%", marginTop: 10, padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => addMoney(amount)} style={{ flex: 1, background: "#16a34a", color: "white", border: "none", padding: "11px", borderRadius: 10, fontWeight: 900, cursor: "pointer" }}>Add ₹{safeNum(amount, 0) || 0} - Pay</button>
            <button onClick={() => { setShowAdd(false); setAmount(""); }} style={{ padding: "11px 16px", background: "#f3f4f6", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>Cancel</button>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#666" }}>🔒 Safe - UPI / Card / NetBanking - Instant credit • Min ₹10</p>
        </div>
      )}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: 14, marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, textAlign: "center" }}>
        <div><div style={{ fontSize: 22 }}>🪙</div><b style={{ fontSize: 11 }}>Earn Coins</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Every Order - 5%</p></div>
        <div><div style={{ fontSize: 22 }}>💸</div><b style={{ fontSize: 11 }}>Use Wallet</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Use in Checkout</p></div>
        <div><div style={{ fontSize: 22 }}>↩️</div><b style={{ fontSize: 11 }}>Refund</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Instant to Wallet</p></div>
      </div>
      <h3 style={{ margin: "20px 0 10px", fontSize: 16, fontWeight: 900 }}>📋 Transactions</h3>
      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, overflow: "hidden" }}>
        {allTxns.map((t, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: i < allTxns.length - 1 ? "1px solid #f3f4f6" : "none" }}><div><b style={{ fontSize: 13, display: "block" }}>{t.title}</b><span style={{ fontSize: 11, color: "#888" }}>{t.time}</span></div><b style={{ fontSize: 14, color: t.type === "credit" ? "#16a34a" : "#dc2626" }}>{t.amt}</b></div>))}
      </div>
      <button onClick={() => purpyGo("/?view=home")} style={{ marginTop: 14, width: "100%", background: "#111", color: "white", border: "none", padding: "12px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>← Back to Home</button>
    </div>
  );
}