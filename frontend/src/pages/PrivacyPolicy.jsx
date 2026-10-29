import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const card = { background: "white", borderRadius: 20, padding: "20px 22px", marginBottom: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #eee" };
  const h = { fontSize: 16, fontWeight: 800, margin: "0 0 8px", color: "#15803d" };
  const p = { fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 };
  return (
    <div style={{ minHeight: "100vh", background: "#f8fdf8", padding: "16px 14px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link to="/" style={{ color: "#15803d", fontWeight: 700, textDecoration: "none", fontSize: 13 }}>← Back to Home</Link>
        <div style={{ background: "linear-gradient(135deg,#16a34a,#166534)", borderRadius: 24, padding: "28px 24px", color: "white", marginTop: 12, marginBottom: 18, textAlign: "center" }}>
          <div style={{ fontSize: 44 }}>🔒</div>
          <h1 style={{ margin: "8px 0 4px", fontSize: 28 }}>Privacy Policy</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: 13 }}>Nee Data - Nee Sontham - Manam - Protect - Chestham</p>
          <p style={{ margin: "10px 0 0", fontSize: 11, background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "6px 12px", borderRadius: 20 }}>Last Updated - 27 Oct 2026 • PURPY • Kakinada</p>
        </div>
        <div style={card}><h3 style={h}>1. 📱 Manam - Emi - Data - Teesukuntam?</h3><p style={p}>Name, Phone Number, Email, Delivery Address, Order History - Matrame - Teesukuntam. Payment Details - Manam - Save - Cheyyam - Payment - Secure Gateway - Dvara - Jaruguthundi.</p></div>
        <div style={card}><h3 style={h}>2. 🎯 Data - Enduku - Vadutham?</h3><p style={p}>• Order Delivery - Kosam<br />• OTP Login - Kosam<br />• Offers / Vouchers - Pampadaniki<br />• Customer Care - Help - Kosam<br />• App - Better - Cheyadaniki</p></div>
        <div style={card}><h3 style={h}>3. 🤝 Data - Evariki - Ivam?</h3><p style={p}>Nee Data - Evariki - Ammamu. Delivery Partner ki - Address + Phone - Matrame - Order Time lo - Chupistham. Police / Court - Adigithe - Thappa - Evariki - Ivam.</p></div>
        <div style={card}><h3 style={h}>4. 🍪 Cookies & Location</h3><p style={p}>Location - Delivery - Kosam - Matrame - Vadutham. Cart - Save - Cheyadaniki - LocalStorage - Vadutham. Nuvvu - Eppudaina - Location - Off - Cheyochu.</p></div>
        <div style={card}><h3 style={h}>5. 🗑️ Data - Delete - Cheyala?</h3><p style={p}>Account Delete - Cheyali - Ante - Customer Care ki - Message - Chey - 24 Hours lo - Nee Data - Antha - Delete - Chestham. Email - support@purpy.in</p></div>
        <div style={card}><h3 style={h}>6. 📞 Contact</h3><p style={p}>PURPY, Kakinada, Andhra Pradesh<br />📧 support@purpy.in<br />📱 +91 98765 43210<br />⏰ 9 AM - 9 PM - Daily</p></div>
        <div style={{ textAlign: "center" }}><Link to="/terms-of-use" style={{ background: "#16a34a", color: "white", padding: "12px 22px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 14, display: "inline-block" }}>Terms of Use - Chudu →</Link></div>
        <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 16 }}>© 2026 PURPY • Kakinada</p>
      </div>
    </div>
  );
}