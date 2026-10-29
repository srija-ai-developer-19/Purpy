import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("purpyOrders") || "[]");
      if (saved && saved.length > 0) setOrders(saved);
      else setOrders([
        { id: "PURPY1001", date: "Today, 10:30 AM", status: "Delivered", total: 523, payment: "COD - Cash", customer: { name: "Srija", phone: "99666 12345", address: "Main Road, Kakinada, Andhra Pradesh - 533001" }, items: [{ name: "Fresh Tomatoes 1kg", qty: 1, price: 24, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&q=80" }, { name: "Fresh Milk 1L", qty: 2, price: 54, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80" }, { name: "Basmati Rice 5kg", qty: 1, price: 449, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80" }] },
        { id: "PURPY1002", date: "Yesterday, 6:15 PM", status: "On the Way", total: 199, payment: "UPI - Paid", customer: { name: "Srija", phone: "99666 12345", address: "Main Road, Kakinada, Andhra Pradesh - 533001" }, items: [{ name: "Fresh Vegetables Combo", qty: 1, price: 99, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80" }] },
      ]);
    } catch (e) { setOrders([]); }
    setLoaded(true);
  }, []);
  const getCustomer = (o) => {
    try {
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      return { name: o.customer?.name || o.name || user?.name || "Srija", phone: o.customer?.phone || o.phone || user?.phone || "99666 12345", address: o.customer?.address || o.address || user?.address || "Main Road, Kakinada, Andhra Pradesh - 533001" };
    } catch (e) { return { name: "Srija", phone: "99666 12345", address: "Main Road, Kakinada, Andhra Pradesh - 533001" }; }
  };
  if (!loaded) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  if (orders.length === 0) return (<div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 12px", textAlign: "center" }}><div style={{ fontSize: 50 }}>📦</div><h2>No Orders Yet</h2><p style={{ color: "#666" }}>You have not placed any order yet.</p><button onClick={() => purpyGo("/?view=items")} style={{ background: "#16a34a", color: "white", border: "none", padding: "11px 22px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>Shop Now →</button></div>);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "14px 12px 30px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>📦 My Orders - {orders.length}</h2>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "#666" }}>Click on an order to view details</p>
      {orders.map((o) => {
        const c = getCustomer(o); const isOpen = openId === o.id; const items = o.items || o.products || [];
        return (
          <div key={o.id} style={{ background: "white", border: "1px solid #eee", borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
            <div onClick={() => setOpenId(isOpen ? null : o.id)} style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <div><b style={{ fontSize: 14 }}>Order {o.id}</b><p style={{ margin: "3px 0 0", fontSize: 11, color: "#666" }}>{o.date || "Today"} • {items.length} Items • {o.payment || "COD"}</p></div>
              <div style={{ textAlign: "right" }}><b style={{ fontSize: 15, color: "#16a34a" }}>₹{o.total || 0}</b><div><span style={{ fontSize: 11, background: o.status === "Delivered" ? "#dcfce7" : "#fef3c7", color: o.status === "Delivered" ? "#166534" : "#92400e", padding: "3px 8px", borderRadius: 10, fontWeight: 700 }}>{o.status || "Delivered"}</span></div><span style={{ fontSize: 12, color: "#16a34a", fontWeight: 900 }}>{isOpen ? "▲ Hide Details" : "▼ View Details"}</span></div>
            </div>
            {isOpen && (
              <div style={{ borderTop: "1px solid #f3f4f6", padding: 14, background: "#fafafb" }}>
                <b style={{ fontSize: 13 }}>👤 Customer Details</b>
                <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 10, padding: 12, marginTop: 8, fontSize: 13, lineHeight: 1.7 }}>
                  <div>👤 <b>Name:</b> {c.name}</div><div>📞 <b>Phone:</b> {c.phone}</div><div>📍 <b>Address:</b> {c.address}</div><div>💳 <b>Payment:</b> {o.payment || "COD - Cash on Delivery"}</div><div>📦 <b>Status:</b> {o.status || "Delivered"}</div>
                </div>
                <b style={{ fontSize: 13, display: "block", marginTop: 14 }}>🛒 Items - {items.length}</b>
                {items.map((it, i) => (<div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: "white", borderRadius: 10, padding: 8, marginTop: 8 }}>{it.img && <img src={it.img} alt="" style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }} />}<div style={{ flex: 1 }}><b style={{ fontSize: 13, display: "block" }}>{it.name || "Product"}</b><span style={{ fontSize: 12, color: "#666" }}>Qty: {it.qty || it.quantity || 1} × ₹{it.price || 0}</span></div><b style={{ fontSize: 13 }}>₹{(it.qty || it.quantity || 1) * (it.price || 0)}</b></div>))}
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <button onClick={() => purpyGo("/?view=items")} style={{ flex: 1, background: "#16a34a", color: "white", border: "none", padding: "10px", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>Reorder</button>
                  <button onClick={() => alert("Return request received. Our team will arrange pickup within 24 hours.")} style={{ flex: 1, background: "white", border: "1px solid #ddd", padding: "10px", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>↩️ Return</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}