export default function OffersBanner() {
  const copy = (code) => { navigator.clipboard?.writeText(code); alert(code + " Copied! 🎉 Checkout lo Paste Chey!"); };
  return (
    <div style={{ padding: "0 12px", maxWidth: 1200, margin: "10px auto" }}>
      <div style={{ background: "linear-gradient(90deg,#16a34a,#22c55e)", color: "white", borderRadius: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div><b style={{ fontSize: 18 }}>🎁 PURPY100 - ₹100 OFF!</b><div style={{ fontSize: 12, opacity: 0.9 }}>On ₹499+ • Free Delivery • Gold Coins 320 = ₹32 OFF</div></div>
        <button onClick={() => copy("PURPY100")} style={{ background: "white", color: "#16a34a", border: "none", padding: "10px 18px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>Copy Code 📋</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8, overflowX: "auto" }}>
        {[["🚚 Free Delivery", "₹499+"], ["🪙 320 Coins", "= ₹32 OFF"], ["↩️ 7 Days Return", "Easy"], ["⚡ 10 Mins", "Kakinada"]].map(([t, s]) => (
          <div key={t} style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: "10px 14px", whiteSpace: "nowrap", fontSize: 12 }}><b>{t}</b><div style={{ color: "#666" }}>{s}</div></div>
        ))}
      </div>
    </div>
  );
}