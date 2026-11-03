import { useState } from "react";
import { purpyGo } from "../App.jsx";

export default function Cart() {
  const readCart = () => {
    try {
      const c = JSON.parse(localStorage.getItem("purpyCart") || "[]");
      return Array.isArray(c) ? c : [];
    } catch { return []; }
  };
  const [cart, setCart] = useState(readCart());

  const save = (newCart) => {
    localStorage.setItem("purpyCart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const addOne = (name) => save(cart.map((x) => (x.name === name ? { ...x, quantity: x.quantity + 1 } : x)));
  
  const removeOne = (name) => {
    const it = cart.find((x) => x.name === name);
    if (!it) return;
    if (it.quantity <= 1) save(cart.filter((x) => x.name !== name));
    else save(cart.map((x) => (x.name === name ? { ...x, quantity: x.quantity - 1 } : x)));
  };

  const total = cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0);
  const totalItems = cart.reduce((s, p) => s + (p.quantity || 0), 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 60 }}>🛒</div>
        <h2>Cart Empty - {totalItems}</h2>
        <p style={{ color: "#666", marginTop: 8 }}>No items in your cart</p>
        <button onClick={() => purpyGo("/?view=home")} style={{ marginTop: 16, padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 20, fontWeight: 700, cursor: "pointer" }}>
          Shop Now 🛍️
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: 16, paddingBottom: 110 }}>
      <h2>Cart - {totalItems} items ✅</h2>
      {cart.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, border: "1px solid #eee", borderRadius: 14, padding: 12, marginBottom: 10, background: "white" }}>
          <img src={item.img || item.image} alt={item.name} style={{ width: 75, height: 75, objectFit: "cover", borderRadius: 12, background: "#f3f4f6" }} />
          <div style={{ flex: 1 }}>
            <b>{item.name}</b>
            <div style={{ color: "#16a34a", fontWeight: 800, marginTop: 2 }}>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</div>
            <div style={{ display: "inline-flex", gap: 4, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, marginTop: 8 }}>
              <button onClick={() => removeOne(item.name)} style={{ border: "none", background: "none", padding: "2px 14px", fontSize: 18, cursor: "pointer" }}>-</button>
              <b style={{ minWidth: 20, textAlign: "center" }}>{item.quantity}</b>
              <button onClick={() => addOne(item.name)} style={{ border: "none", background: "none", padding: "2px 14px", fontSize: 18, cursor: "pointer" }}>+</button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, padding: 14, border: "1px solid #eee", borderRadius: 14, background: "white" }}>
        <span>To Pay</span><span style={{ color: "#16a34a" }}>₹{total}</span>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "12px 16px", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b>₹{total}</b>
        <button onClick={() => purpyGo("/?view=checkout")} style={{ background: "#16a34a", color: "white", border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>Purchase ➡️</button>
      </div>
    </div>
  );
}