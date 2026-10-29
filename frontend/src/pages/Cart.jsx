import { useState } from "react";

export default function Cart() {
  // ⭐ OLD CART - DUPLICATE - UNTE - KUDA - QUANTITY - LA - MARCHI - FIX - CHESTHUNDI
  const getInitialCart = () => {
    const raw = JSON.parse(localStorage.getItem("purpyCart") || "[]");
    const merged = [];
    raw.forEach(p => {
      const f = merged.find(x => x.name === p.name);
      if (f) f.quantity = (f.quantity || 1) + (p.quantity || 1);
      else merged.push({ ...p, quantity: p.quantity || 1 });
    });
    return merged;
  };

  const [cart, setCart] = useState(getInitialCart);

  const save = (newCart) => {
    setCart(newCart);
    localStorage.setItem("purpyCart", JSON.stringify(newCart));
  };

  // ⭐ + Button - quantity +1 - Duplicate - Kaadhu - Ippudu!
  const addOne = (name) => {
    save(cart.map(x => x.name === name ? { ...x, quantity: (x.quantity || 1) + 1 } : x));
  };

  // ⭐ - Button - quantity -1 - 0 Aithe - Remove!
  const removeOne = (name) => {
    const f = cart.find(x => x.name === name);
    if (!f) return;
    if ((f.quantity || 1) <= 1) save(cart.filter(x => x.name !== name));
    else save(cart.map(x => x.name === name ? { ...x, quantity: x.quantity - 1 } : x));
  };

  // ⭐ Remove All - Mottam - Thiyyu
  const removeAll = (name) => {
    save(cart.filter(x => x.name !== name));
  };

  // ⭐ TOTAL - quantity * price - Correct - Ga!
  const totalItems = cart.reduce((s, p) => s + (p.quantity || 1), 0);
  const total = cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 1), 0);
  const delivery = total >= 499 || total === 0 ? 0 : 40;
  const finalTotal = total + delivery;

  if (cart.length === 0) return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 60 }}>🛒</div>
      <h2>Cart Empty!</h2>
      <p style={{ color: "#666" }}>Inka Emi Add Cheyaledhu! Shop Chey!</p>
      <button onClick={() => window.location.href = "/?view=home"} style={{ padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 700 }}>Shop Now 🛍️</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: 16, paddingBottom: 110 }}>
      <h2 style={{ margin: "0 0 4px" }}>Cart - {totalItems} items</h2>
      <p style={{ fontSize: 12, color: "#666", margin: "0 0 14px" }}>PURPY • Kakinada • 10 Mins Delivery ⚡</p>

      {cart.map((item, i) => {
        const qty = item.quantity || 1;
        // ⭐ IMAGE FIX - Anni Field Lu - Check Chesthundi
        const imgVal = item.img || item.image || item.photo || item.pic || item.emoji || "";
        const isUrl = imgVal.startsWith("http") || imgVal.startsWith("/") || imgVal.includes(".jpg") || imgVal.includes(".png") || imgVal.includes(".webp") || imgVal.includes(".jpeg");

        return (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", borderRadius: 14, padding: 12, marginBottom: 10, background: "white" }}>
            {/* ⭐ IMAGE BOX */}
            <div style={{ width: 75, height: 75, background: "#f9fafb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, overflow: "hidden", flexShrink: 0, border: "1px solid #eee" }}>
              {isUrl ? (
                <img
                  src={imgVal}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = "🥛"; }}
                />
              ) : (
                <span>{imgVal || "🥛"}</span>
              )}
            </div>

            {/* ⭐ NAME + PRICE */}
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 14 }}>{item.name}</b>
              <div style={{ fontSize: 12, color: "#999" }}>{item.brand || item.cat || item.category || "PURPY • Kakinada"}</div>
              <div style={{ color: "#16a34a", fontWeight: 800, marginTop: 2 }}>₹{item.price} x {qty} = ₹{item.price * qty}</div>

              {/* ⭐ + / - SYMBOL */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, marginTop: 8 }}>
                <button onClick={() => removeOne(item.name)} style={{ border: "none", background: "none", fontSize: 18, padding: "2px 12px", cursor: "pointer", fontWeight: 800, color: "#16a34a" }}>-</button>
                <b style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{qty}</b>
                <button onClick={() => addOne(item.name)} style={{ border: "none", background: "none", fontSize: 18, padding: "2px 12px", cursor: "pointer", fontWeight: 800, color: "#16a34a" }}>+</button>
              </div>
            </div>

            {/* ⭐ REMOVE BUTTON */}
            <button onClick={() => removeAll(item.name)} style={{ border: "1px solid #fca5a5", background: "#fef2f2", color: "#dc2626", borderRadius: 20, padding: "6px 10px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Remove ❌</button>
          </div>
        );
      })}

      {/* ⭐ BILL DETAILS */}
      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
        <b>Bill Details 🧾</b>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8 }}><span>Items Total ({totalItems} items)</span><span>₹{total}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 4 }}><span>Delivery</span><span style={{ color: delivery === 0 ? "#16a34a" : "#000", fontWeight: 700 }}>{delivery === 0 ? "FREE 🎉" : "₹" + delivery}</span></div>
        <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>{total >= 499 ? "You Saved ₹40 Delivery! 🎉" : `₹${499 - total} More Add Cheste - Free Delivery! 🚚`}</div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800 }}><span>To Pay</span><span style={{ color: "#16a34a" }}>₹{finalTotal}</span></div>
      </div>

      <button onClick={() => window.location.href = "/?view=home"} style={{ width: "100%", marginTop: 10, padding: 12, background: "white", border: "1px solid #ddd", borderRadius: 12, cursor: "pointer", fontWeight: 700 }}>+ Add More Items 🛍️</button>

      {/* ⭐ PURCHASE / CHECKOUT - FIXED BOTTOM BUTTON */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "12px 16px", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100 }}>
        <div>
          <b style={{ fontSize: 18 }}>₹{finalTotal}</b>
          <div style={{ fontSize: 11, color: "#16a34a" }}>{totalItems} Items • {delivery === 0 ? "Free Delivery" : "Delivery ₹40"}</div>
        </div>
        <button onClick={() => window.location.href = "/?view=checkout"} style={{ background: "#16a34a", color: "white", border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          Purchase ➡️
        </button>
      </div>
    </div>
  );
}