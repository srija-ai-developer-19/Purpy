import { useState } from "react";
import { purpyGo } from "../App.jsx";

export default function Orders() {
  const [orders, setOrders] = useState(() => {
    try {
      const userRaw = localStorage.getItem("purpyUser");
      const user = userRaw ? JSON.parse(userRaw) : null;
      
      // LOGIN AVVALEDU ANTE NO ORDERS
      if (!user || !user.phone) {
        return [];
      }

      const userKey = `purpyOrders_${user.phone}`;
      let o = JSON.parse(localStorage.getItem(userKey) || "[]");
      
      // Old data unte migrate cheyyi
      if (o.length === 0) {
        const old = JSON.parse(localStorage.getItem("purpyOrders") || "[]");
        if (old.length > 0) {
          localStorage.setItem(userKey, JSON.stringify(old));
          o = old;
        }
      }
      return Array.isArray(o) ? o : [];
    } catch (e) { 
      return []; 
    }
  });

  const [openId, setOpenId] = useState(null);

  const saveOrders = (updated) => {
    try {
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (!user || !user.phone) return;
      const userKey = `purpyOrders_${user.phone}`;
      localStorage.setItem(userKey, JSON.stringify(updated));
      localStorage.setItem("purpyOrders", JSON.stringify(updated)); // backup
      setOrders(updated);
    } catch {}
  };

  const cancelOrder = (id) => {
    if (!confirm("Ee Order - Cancel - Cheyala?")) return;
    const updated = orders.map(o => o.id === id ? { ...o, status: "Cancelled" } : o);
    saveOrders(updated);
  };

  // LOGIN CHECK - LOGOUT AYTHE LOGIN PAGE KI
  const userExists = (() => {
    try { const u = JSON.parse(localStorage.getItem("purpyUser") || "null"); return !!(u && u.phone); } catch { return false; }
  })();

  if (!userExists) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 50 }}>🔒</div>
        <h2>Please Login</h2>
        <p style={{ color: "#666", fontSize: 13 }}>Orders chudali ante login avvali</p>
        <button onClick={() => purpyGo("/?view=account")} style={{ padding: "10px 20px", background: "#111", color: "white", border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 800, marginRight: 10 }}>Login</button>
        <button onClick={() => purpyGo("/?view=home")} style={{ padding: "10px 20px", background: "white", border: "1px solid #ddd", borderRadius: 20, cursor: "pointer", fontWeight: 800 }}>Home</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 50 }}>📦</div>
        <h2>No Orders Yet!</h2>
        <p style={{ color: "#666", fontSize: 13 }}>Inka Order Cheyyaledhu. Shop Chesi Order Cheyyi.</p>
        <button onClick={() => purpyGo("/?view=home")} style={{ padding: "10px 20px", background: "#111", color: "white", border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 800 }}>Shop Now</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2 style={{ margin: "0 0 4px" }}>📦 My Orders - {orders.length}</h2>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "#666" }}>Click on an order to view details</p>

      {orders.map((o) => {
        const items = Array.isArray(o.items) ? o.items : [];
        const totalItems = o.totalItems || items.reduce((s, p) => s + (p.quantity || 1), 0);
        const isOpen = openId === o.id;
        const isCancelled = o.status === "Cancelled";
        const addr = o.address || null;
        const payLabel = o.pay || "COD";
        const payDetail = o.payDetail || (payLabel === "COD" ? "Pay Cash on Delivery" : "");
        const payStatus = o.paymentStatus || (payLabel === "COD" ? "Pending - Pay on Delivery" : "Paid ✅");

        return (
          <div key={o.id} style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, marginBottom: 12 }}>
            <div onClick={() => setOpenId(isOpen ? null : o.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}>
              <div>
                <b style={{ fontSize: 13 }}>Order {o.id}</b>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#666" }}>{o.date || "No Date"} • {totalItems} items • {payLabel}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, fontWeight: 800, color: isCancelled ? "#dc2626" : "#16a34a" }}>{isCancelled ? "❌ Cancelled" : `✅ ${o.status || "Placed"}`}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <b style={{ fontSize: 14 }}>₹{o.total || 0}</b><br />
                <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>{isOpen ? "▲ Hide Details" : "▼ View Details"}</span>
              </div>
            </div>

            {isOpen && (
              <div style={{ borderTop: "1px dashed #ddd", marginTop: 12, paddingTop: 12 }}>
                <b style={{ fontSize: 13 }}>🛒 Items:</b>
                {items.length === 0 && <p style={{ fontSize: 12, color: "#888" }}>Items Info Ledu - Pata Order</p>}
                {items.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                    <span>{p.name || "Product"} x {p.quantity || 1}</span>
                    <b>₹{(p.price || 0) * (p.quantity || 1)}</b>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginTop: 6 }}><span>Items Total</span><span>₹{o.itemsTotal || o.total || 0}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666" }}><span>Delivery</span><span>{o.delivery === 0 ? "FREE 🎉" : `₹${o.delivery || 0}`}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 800, marginTop: 4 }}><span>Total</span><span style={{ color: "#16a34a" }}>₹{o.total || 0}</span></div>

                <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 10, marginTop: 10, fontSize: 12 }}>
                  <b>💳 Payment: {payLabel}</b><br />
                  {payDetail}<br />
                  Status: {payStatus}
                </div>

                {addr ? (
                  <div style={{ background: "#f9fafb", borderRadius: 10, padding: 10, marginTop: 8, fontSize: 12, lineHeight: 1.6 }}>
                    <b>📍 Deliver To: {addr.name} - {addr.type || ""}</b><br />
                    {addr.house}, {addr.street}<br />
                    {addr.city} - {addr.pincode}<br />
                    📞 {addr.phone}
                  </div>
                ) : (
                  <div style={{ background: "#fefce8", borderRadius: 10, padding: 10, marginTop: 8, fontSize: 12 }}>
                    📍 Address Info Ledu - Pata Order Kabatti
                  </div>
                )}

                {!isCancelled && (
                  <button onClick={() => cancelOrder(o.id)} style={{ width: "100%", marginTop: 12, padding: 10, background: "white", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>❌ Cancel Order</button>
                )}
              </div>
            )}
          </div>
        );
      })}

      <button onClick={() => purpyGo("/?view=home")} style={{ width: "100%", padding: 12, background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", marginTop: 4 }}>← Back to Home</button>
    </div>
  );
}