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
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState("GPay");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const raw = localStorage.getItem("purpyWallet");
      if (!raw) return 1250;
      const w = JSON.parse(raw);
      if (w && typeof w === "object") return Number(w.balance) || 1250;
      return Number(raw) || 1250;
    } catch (e) { return 1250; }
  });

  const [form, setForm] = useState({ name: "", phone: "", house: "", street: "", landmark: "", city: "Kakinada", pincode: "", type: "Home" });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const saveAddresses = (list) => { setAddresses(list); localStorage.setItem("purpyAddresses", JSON.stringify(list)); };
  const startAdd = () => { setForm({ name: "", phone: "", house: "", street: "", landmark: "", city: "Kakinada", pincode: "", type: "Home" }); setEditId(null); setShowForm(true); };
  const startEdit = (a) => { setForm({ ...a }); setEditId(a.id); setShowForm(true); };

  // ✅ LOGIN CHECK HELPER - Login / Signup Aindo Ledo Chudataniki
  const getUser = () => {
    try {
      const u1 = JSON.parse(localStorage.getItem("purpyUser") || "null");
      if (u1) return u1;
      const u2 = JSON.parse(localStorage.getItem("purpyCurrentUser") || "null");
      if (u2) return u2;
      if (localStorage.getItem("purpyLoggedIn") === "true") return { name: "User" };
    } catch (e) {}
    return null;
  };
  const isLoggedIn = !!getUser();

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

    // ✅ 1. LOGIN ALERT - Signup / Login Lekapothe Order Avvadhu
    if (!getUser()) {
      alert("⚠️ Mundu Login / Signup Cheyyi Srija! Login Lekunda Order Cheyyalevu.");
      window.location.href = "/?view=login";
      return;
    }

    if (cart.length === 0) return alert("Cart Empty!");
    const addr = addresses.find(a => a.id === selectedId);
    if (!addr) return alert("Address - Select - Chey - Leda - Add - Chey!");

    let payDetail = "";
    if (pay === "UPI") {
      if (!upiId.includes("@") || upiId.length < 5) return alert("Correct UPI ID Ivvu! Eg: srija@okaxis");
      payDetail = `${upiApp} - ${upiId}`;
    }
    if (pay === "Card") {
      if (card.number.replace(/\s/g, "").length !== 16) return alert("Correct 16 Digit Card Number Ivvu!");
      if (!card.name.trim()) return alert("Card Meedha Name Ivvu!");
      if (card.expiry.length < 5) return alert("Expiry Ivvu! Eg: 12/28");
      if (card.cvv.length !== 3) return alert("Correct 3 Digit CVV Ivvu!");
      payDetail = "Card **** " + card.number.slice(-4);
    }
    if (pay === "Wallet") {
      if (walletBalance < total) return alert(`Wallet Lo Money Thakkuva! Balance ₹${walletBalance}, Total ₹${total}. COD / UPI Select Chey!`);
      payDetail = `Wallet Paid - Balance ₹${walletBalance - total} Migilindhi`;
    }
    if (pay === "COD") payDetail = "Pay Cash on Delivery";

    // ✅ 2. ORDER PLACE CHESE MUNDHU CONFIRM ALERT
    const confirmMsg =
      `Order Confirm Cheyala Srija? 🤔\n\n` +
      `🛒 Items: ${totalItems}\n` +
      `💰 Total: ₹${total} (Delivery: ${delivery === 0 ? "FREE" : "₹" + delivery})\n` +
      `💳 Payment: ${pay} - ${payDetail}\n` +
      `📍 Address: ${addr.name}, ${addr.house}, ${addr.street}, ${addr.city} - ${addr.pincode}\n\n` +
      `OK Kotte - Order Place Avthundhi ✅\nCancel Kotte - Order Avvadhu ❌`;
    if (!confirm(confirmMsg)) return;

    setPlacing(true);

    if (pay === "Wallet") {
      const newBalance = walletBalance - total;
      setWalletBalance(newBalance);
      try {
        const raw = localStorage.getItem("purpyWallet");
        const old = raw ? JSON.parse(raw) : {};
        const coins = old && typeof old === "object" ? (Number(old.coins) || 125) : 125;
        localStorage.setItem("purpyWallet", JSON.stringify({ balance: newBalance, coins }));
      } catch (e) {
        localStorage.setItem("purpyWallet", JSON.stringify({ balance: newBalance, coins: 125 }));
      }
    }

    const orders = JSON.parse(localStorage.getItem("purpyOrders") || "[]");
    const user = getUser();
    const newOrder = {
      id: Date.now(),
      items: cart,
      total, itemsTotal, delivery, totalItems,
      address: addr,
      pay,
      payDetail,
      paymentStatus: pay === "COD" ? "Pending - Pay on Delivery" : "Paid ✅",
      date: new Date().toLocaleString("en-IN"),
      status: "Placed",
      userName: user?.name || user?.phone || "",
      userPhone: user?.phone || ""
    };
    localStorage.setItem("purpyOrders", JSON.stringify([newOrder, ...orders]));
    localStorage.removeItem("purpyCart");
    setTimeout(() => {
      window.location.href = "/?view=orders&success=1";
    }, 600);
  };

  const selected = addresses.find(a => a.id === selectedId);

  // ✅ LOGIN LEKAPOTHE - Checkout Kanipinchadhu - Login Page Chupisthundhi
  if (!isLoggedIn) return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 50 }}>🔒</div>
      <h2>Login Required!</h2>
      <p style={{ color: "#666", fontSize: 13 }}>Order Cheyyalante Mundu Login / Signup Cheyyali Srija.</p>
      <button onClick={() => window.location.href = "/?view=login"} style={{ padding: "12px 24px", background: "#16a34a", color: "white", border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 800, marginRight: 8 }}>Login / Signup</button>
      <button onClick={() => window.location.href = "/?view=home"} style={{ padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 800 }}>Back to Home</button>
    </div>
  );

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
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["COD", "UPI", "Card", "Wallet"].map(m => (
          <button key={m} onClick={() => setPay(m)} style={{ flex: 1, minWidth: 70, padding: 12, borderRadius: 12, border: pay === m ? "2px solid #16a34a" : "1px solid #ddd", background: pay === m ? "#f0fdf4" : "white", cursor: "pointer", fontWeight: 800 }}>{m === "COD" ? "💵 COD" : m === "UPI" ? "📱 UPI" : m === "Card" ? "💳 Card" : "👛 Wallet"}</button>
        ))}
      </div>

      {pay === "COD" && (
        <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 12, padding: 12, marginTop: 10, fontSize: 13 }}>
          💵 <b>Cash on Delivery</b> - Delivery Boy Ki ₹{total} Cash Ivvu. Extra Charge Ledhu.
        </div>
      )}

      {pay === "UPI" && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 12, marginTop: 10 }}>
          <b style={{ fontSize: 13 }}>📱 UPI ID Ivvu</b>
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Eg: srija@okaxis / 98564@okhdfc" value={upiId} onChange={e => setUpiId(e.target.value)} />
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {["GPay", "PhonePe", "Paytm"].map(app => (
              <button key={app} type="button" onClick={() => setUpiApp(app)} style={{ background: upiApp === app ? "#16a34a" : "#f0fdf4", color: upiApp === app ? "white" : "#111", border: upiApp === app ? "2px solid #16a34a" : "1px solid #bbf7d0", padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
                {app === "GPay" ? "📱 GPay" : app === "PhonePe" ? "💜 PhonePe" : "💙 Paytm"} {upiApp === app ? "✓" : ""}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#666", margin: "8px 0 0" }}>Selected: <b style={{ color: "#16a34a" }}>{upiApp}</b> - {upiApp} App Lo Pay Chesthavu • Demo App Kabatti Real Money Cut Avvadhu.</p>
        </div>
      )}

      {pay === "Card" && (
        <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 12, marginTop: 10 }}>
          <b style={{ fontSize: 13 }}>💳 Card Details</b>
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Card Number - 16 Digits" value={card.number} onChange={e => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 16) })} maxLength={16} />
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Name on Card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input style={inputStyle} placeholder="MM/YY - 12/28" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value.slice(0, 5) })} />
            <input style={inputStyle} placeholder="CVV - 123" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })} maxLength={3} />
          </div>
          <p style={{ fontSize: 11, color: "#666", margin: "8px 0 0" }}>🔒 Demo Only - Real Card Details Ivvoddu. 4242 4242 4242 4242 Test Card Vadu.</p>
        </div>
      )}

      {pay === "Wallet" && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 12, marginTop: 10, fontSize: 13 }}>
          👛 <b>Wallet Balance: ₹{walletBalance}</b><br />
          Total: ₹{total} - Pay Chesaka Migilindhi: <b style={{ color: walletBalance >= total ? "#16a34a" : "#dc2626" }}>₹{walletBalance - total}</b>
          {walletBalance < total && <div style={{ color: "#dc2626", marginTop: 6, fontWeight: 700 }}>⚠️ Wallet Lo Money Saripodhu! COD / UPI Vaduko.</div>}
          {walletBalance >= total && <div style={{ color: "#16a34a", marginTop: 6 }}>✅ Wallet Nunchi Pay Avthundhi</div>}
        </div>
      )}

      <button onClick={placeOrder} disabled={!selected || placing} style={{ width: "100%", padding: 15, background: (!selected || placing) ? "#ccc" : "#16a34a", color: "white", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: (!selected || placing) ? "not-allowed" : "pointer", marginTop: 16 }}>
        {placing ? "Placing Order... ⏳" : selected ? `Place Order - ₹${total} - ${pay} ✅` : "Address Select Chey - Place Order Kosam!"}
      </button>
      <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 10 }}>🚚 Free Delivery ₹499+ • 🛡️ 7 Days Return • 🔒 Secure • 📍 Kakinada</p>
    </div>
  );
}