import { Link } from "react-router-dom";

export default function TermsOfUse() {
  const card = { background: "white", borderRadius: 20, padding: "20px 22px", marginBottom: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #eee" };
  const h = { fontSize: 16, fontWeight: 800, margin: "0 0 8px", color: "#15803d" };
  const p = { fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 };
  return (
    <div style={{ minHeight: "100vh", background: "#f8fdf8", padding: "16px 14px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link to="/" style={{ color: "#15803d", fontWeight: 700, textDecoration: "none", fontSize: 13 }}>← Back to Home</Link>
        <div style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 24, padding: "28px 24px", color: "white", marginTop: 12, marginBottom: 18, textAlign: "center" }}>
          <div style={{ fontSize: 44 }}>📜</div>
          <h1 style={{ margin: "8px 0 4px", fontSize: 28 }}>Terms of Use</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: 13 }}>PURPY - Vadithe - Ee Rules - Ki - Agree - Ayinattu</p>
          <p style={{ margin: "10px 0 0", fontSize: 11, background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "6px 12px", borderRadius: 20 }}>Last Updated - 27 Oct 2026 • PURPY • Kakinada</p>
        </div>
        <div style={card}><h3 style={h}>1. 🛒 Order & Delivery</h3><p style={p}>• Free Delivery - ₹499+ Orders ki<br />• 10 Min Delivery - Traffic / Weather - Batti - Late - Avvochu<br />• Address - Thappu - Iste - Order - Cancel - Avvochu<br />• Stock - Lekapothe - Refund - Istham</p></div>
        <div style={card}><h3 style={h}>2. 💰 Price & Payment</h3><p style={p}>• Price - App lo - Chupinchedhi - Final<br />• UPI / Cash on Delivery - Rendu - Untayi<br />• Voucher - Okka Order ki - Okkate - Vadali<br />• Fake Order - Cheste - Account - Block - Avuthundi</p></div>
        <div style={card}><h3 style={h}>3. ↩️ Return & Refund</h3><p style={p}>• 7 Days Return - Clothes / Electronics / Fashion ki<br />• Grocery / Milk / Food - Return - Ledu - Damage - Aithe - Photo - Pampithe - Refund<br />• Refund - 3-5 Working Days lo - Wallet / Bank ki - Vasthundi</p></div>
        <div style={card}><h3 style={h}>4. 👤 Account Rules</h3><p style={p}>• Okka Phone ki - Okka Account<br />• Password / OTP - Evariki - Cheppaku<br />• Nee Account lo - Jarige - Orders ki - Nuvve - Responsible<br />• Misuse - Cheste - PURPY - Account - Delete - Cheyochu</p></div>
        <div style={card}><h3 style={h}>5. 🪙 Wallet & Gold Coins</h3><p style={p}>• Wallet Money - Cash ga - Teeyalem<br />• Gold Coins - Offers lo - Matrame - Vadali<br />• Coins - Expire - Avvochu - App lo - Chudu</p></div>
        <div style={card}><h3 style={h}>6. ⚖️ Final</h3><p style={p}>Terms - Eppudaina - Marchavochu - App lo - Update - Chestham. Dispute - Aithe - Kakinada Court - Lo - Matrame - Solve - Avuthundi.</p></div>
        <div style={{ textAlign: "center" }}><Link to="/privacy-policy" style={{ background: "#16a34a", color: "white", padding: "12px 22px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 14, display: "inline-block" }}>Privacy Policy - Chudu →</Link></div>
        <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 16 }}>© 2026 PURPY • Kakinada</p>
      </div>
    </div>
  );
}