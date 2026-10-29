import { useState } from "react";

export default function Checkout() {
  const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
  const totalItems = cart.reduce((s, p) => s + (p.quantity || 1), 0);
  const itemsTotal = cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 1), 0);
  const delivery = itemsTotal >= 499 || itemsTotal === 0 ? 0 : 40;
  const total = itemsTotal + delivery;

  const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem("purpyAddresses") || "[]"));
  const [selectedId, setSelectedId] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("purpyAddresses") || "[]");
    const def = saved.find(a => a.isDefault) || saved[0];
    return def ? def.id : null;
  });
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [editId, setEditId] = useState(null);
  const [pay, setPay] = useState("COD");
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", house: "", street: "", landmark: "", city: "Kakinada", pincode: "", type: "Home" });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const saveAddresses = (list) => { setAddresses(list); localStorage.setItem("purpyAddresses", JSON.stringify(list)); };
  const startAdd = () => { setForm({ name: "", phone: "", house: "", street: "", landmark: "", city: "Kakinada", pincode: "", type: "Home" }); setEditId(null); setShowForm(true); };
  const startEdit = (a) => { setForm({ ...a }); setEditId(a.id); setShowForm(true); };

  const saveAddress = () => {
    if (!form.name.trim()) return alert("Name - Ivvu Srija!");
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) return alert("Correct 10 Digit Phone - Ivvu!");
    if (!form.house.trim() || !form.street.trim()) return alert("House No + Street - Ivvu!");
    if (!/^\d{6}$/.test(form.pincode.trim())) return alert("Correct 6 Digit Pincode - Ivvu!");
    if (editId) {
      const updated = addresses.map(a => a.id === editId ? { ...form, id: editId, isDefault: a.isDefault } : a);
      saveAddresses(updated);
    } else {
      const newAddr = { ...form, id: Date.now(), isDefault: addresses.length === 0 };
      const updated = [...addresses, newAddr];
      saveAddresses(updated);
      setSelectedId(newAddr.id);
    }
    setShowForm(false); setEditId(null);
  };

  const deleteAddress = (id) => {
    if (!confirm("Ee Address - Delete - Cheyala?")) return;
    const updated = addresses.filter(a => a.id !== id);
    if (updated.length && !updated.some(a => a.isDefault)) updated[0].isDefault = true;
    saveAddresses(updated);
    if (selectedId === id) setSelectedId(updated[0]?.id || null);
  };

  const makeDefault = (id) => {
    const updated = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    saveAddresses(updated); setSelectedId(id);
  };

  const placeOrder = () => {
    if (placing) return;
    if (cart.length === 0) return alert("Cart Empty!");
    const addr = addresses.find(a => a.id === selectedId);
    if (!addr) return alert("Address - Select - Chey - Leda - Add - Chey!");
    setPlacing(true);
    const orders = JSON.parse(localStorage.getItem("purpyOrders") || "[]");
    const newOrder = { id: Date.now(), items: cart, total, itemsTotal, delivery, totalItems, address: addr, pay, date: new Date().toLocaleString("en-IN"), status: "Placed" };
    localStorage.setItem("purpyOrders", JSON.stringify([newOrder, ...orders]));
    localStorage.removeItem("purpyCart");
    window.location.href = "/?view=orders&success=1";
  };

  const selected = addresses.find(a => a.id === selectedId);
  if (cart.length === 0) return (
    <div style={{ padding: 40, textAlign: "center" }}><div style={{ fontSize: 50 }}>🛒</div><h2>Cart Empty!</h2><button onClick={() => window.location.href = "/?view=home"} style={{ padding: "10px 20px", background: "#111", color: "white", border: "none", borderRadius: 20, cursor: "pointer" }}>Shop Now</button></div>
  );

  const inputStyle = { width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>💳 Checkout</h2>
      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
        {cart.map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
            <span>{p.name} x {p.quantity || 1}</span><b>₹{(p.price || 0) * (p.quantity || 1)}</b>
          </div>
        ))}
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span>Delivery</span><span>{delivery === 0 ? "FREE 🎉" : "₹" + delivery}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginTop: 6 }}><span>Total ({totalItems} items)</span><span style={{ color: "#16a34a" }}>₹{total}</span></div>
      </div>

      <h3 style={{ margin: "20px 0 10px" }}>📍 Delivery Address - {addresses.length} Saved</h3>
      {addresses.map(a => (
        <div key={a.id} onClick={() => setSelectedId(a.id)} style={{ background: selectedId === a.id ? "#f0fdf4" : "white", border: selectedId === a.id ? "2px solid #16a34a" : "1px solid #eee", borderRadius: 14, padding: 14, marginBottom: 10, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <b>{a.type === "Home" ? "🏠" : a.type === "Work" ? "🏢" : "📍"} {a.name} - {a.type}</b>
            <span style={{ fontSize: 18 }}>{selectedId === a.id ? "✅" : "⭕"}</span>
          </div>
          <p style={{ fontSize: 13, color: "#444", margin: "6px 0", lineHeight: 1.5 }}>{a.house}, {a.street}{a.landmark ? ", Near " + a.landmark : ""}<br />{a.city} - {a.pincode}<br />📞 {a.phone}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {a.isDefault && <span style={{ background: "#16a34a", color: "white", fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700 }}>DEFAULT ✓</span>}
            {!a.isDefault && <button onClick={(e) => { e.stopPropagation(); makeDefault(a.id); }} style={{ background: "white", border: "1px solid #16a34a", color: "#16a34a", fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontWeight: 700 }}>Set Default</button>}
            <button onClick={(e) => { e.stopPropagation(); startEdit(a); }} style={{ background: "#fef3c7", border: "1px solid #facc15", fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer" }}>✏️ Edit</button>
            <button onClick={(e) => { e.stopPropagation(); deleteAddress(a.id); }} style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer" }}>🗑️ Delete</button>
          </div>
        </div>
      ))}
      {!showForm && <button onClick={startAdd} style={{ width: "100%", padding: 12, background: "white", border: "2px dashed #16a34a", color: "#16a34a", borderRadius: 12, cursor: "pointer", fontWeight: 800 }}>+ Add New Address</button>}
      {showForm && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14, marginTop: 10 }}>
          <b>{editId ? "✏️ Edit Address" : "➕ New Address"}</b>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input style={inputStyle} placeholder="Full Name * Eg: Srija" value={form.name} onChange={e => set("name", e.target.value)} />
            <input style={inputStyle} placeholder="Phone * 9856475235" value={form.phone} onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength={10} />
          </div>
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="House No / Flat / Building *" value={form.house} onChange={e => set("house", e.target.value)} />
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Street / Area *" value={form.street} onChange={e => set("street", e.target.value)} />
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Landmark - Eg: Near Temple" value={form.landmark} onChange={e => set("landmark", e.target.value)} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input style={inputStyle} placeholder="City * Eg: Kakinada" value={form.city} onChange={e => set("city", e.target.value)} />
            <input style={inputStyle} placeholder="Pincode * 533001" value={form.pincode} onChange={e => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {["Home", "Work", "Other"].map(t => (
              <button key={t} onClick={() => set("type", t)} style={{ flex: 1, padding: 10, borderRadius: 10, border: form.type === t ? "2px solid #16a34a" : "1px solid #ddd", background: form.type === t ? "#f0fdf4" : "white", cursor: "pointer", fontWeight: 800 }}>{t === "Home" ? "🏠 Home" : t === "Work" ? "🏢 Work" : "📍 Other"}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={saveAddress} style={{ flex: 1, padding: 12, background: "#16a34a", color: "white", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>✅ Save Address</button>
            {addresses.length > 0 && <button onClick={() => setShowForm(false)} style={{ padding: "12px 16px", background: "white", border: "1px solid #ddd", borderRadius: 10, cursor: "pointer" }}>Cancel</button>}
          </div>
        </div>
      )}
      {selected && !showForm && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 12, marginTop: 12, fontSize: 13 }}>
          <b>Deliver To: ✅ {selected.name} - {selected.type}</b><br />{selected.house}, {selected.street}, {selected.city} - {selected.pincode} • 📞 {selected.phone}
        </div>
      )}
      <h3 style={{ margin: "20px 0 10px" }}>💳 Payment</h3>
      <div style={{ display: "flex", gap: 8 }}>
        {["COD", "UPI", "Card"].map(m => (
          <button key={m} onClick={() => setPay(m)} style={{ flex: 1, padding: 12, borderRadius: 12, border: pay === m ? "2px solid #16a34a" : "1px solid #ddd", background: pay === m ? "#f0fdf4" : "white", cursor: "pointer", fontWeight: 800 }}>{m === "COD" ? "💵 COD" : m === "UPI" ? "📱 UPI" : "💳 Card"}</button>
        ))}
      </div>
      <button onClick={placeOrder} disabled={!selected || placing} style={{ width: "100%", padding: 15, background: (!selected || placing) ? "#ccc" : "#16a34a", color: "white", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: (!selected || placing) ? "not-allowed" : "pointer", marginTop: 16 }}>
        {placing ? "Placing Order... ⏳" : selected ? `Place Order - ₹${total} ✅` : "Address Select Chey - Place Order Kosam!"}
      </button>
      <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 10 }}>🚚 Free Delivery ₹499+ • 🛡️ 7 Days Return • 🔒 Secure • 📍 Kakinada</p>
    </div>
  );
}