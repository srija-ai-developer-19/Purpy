import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0); // ZERO NUNDI START

  useEffect(() => {
    setQty(0); // Image open cheste zero ne
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let found = null;
    try {
      const sel = JSON.parse(localStorage.getItem("purpySelectedProduct") || "null");
      if (sel) found = sel;
    } catch {}
    if (!found) {
      try {
        const last = JSON.parse(localStorage.getItem("purpyLastItems") || "[]");
        found = last.find((p) => String(p.id) === String(id)) || last[0];
      } catch {}
    }
    if (!found) {
      found = { 
        id: id || Date.now(), 
        name: "Cuff Bangles", 
        price: 499, 
        oldPrice: 699, 
        img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80" 
      };
    }
    if (found && !found.img && found.image) found.img = found.image;
    setProduct(found);
  }, []);

  // PLUS - ADD AVVALI
  const handlePlus = () => {
    setQty((prev) => prev + 1);
  };

  // MINUS - TAGGALI - ZERO KINDAKI RADU
  const handleMinus = () => {
    setQty((prev) => Math.max(0, prev - 1));
  };

  const addToCartAndGo = () => {
    if (qty === 0) {
      alert("Please add quantity first - Click + button");
      return;
    }
    if (!product) return;
    try {
      const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
      const cartKey = user?.phone ? `purpyCart_${user.phone}` : "purpyCart";
      let cart = JSON.parse(localStorage.getItem(cartKey) || localStorage.getItem("purpyCart") || "[]");
      if (!Array.isArray(cart)) cart = [];
      
      const idx = cart.findIndex((p) => p.name === product.name);
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 0) + qty;
      } else {
        cart.push({ 
          id: product.id || Date.now(), 
          name: product.name, 
          price: Number(product.price), 
          img: product.img || "", 
          quantity: qty 
        });
      }
      localStorage.setItem(cartKey, JSON.stringify(cart));
      localStorage.setItem("purpyCart", JSON.stringify(cart));
    } catch {}
    purpyGo("/?view=cart");
  };

  if (!product) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "14px 12px 120px" }}>
      <span onClick={() => purpyGo("/?view=home")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700, fontSize: 14 }}>← Back to Home</span>
      
      <div style={{ position: "relative", marginTop: 12 }}>
        <div style={{ borderRadius: 16, overflow: "hidden", height: 380, background: "#f3f4f6", border: "1px solid #eee" }}>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ 
          position: "absolute", top: 12, right: 12, 
          background: qty === 0 ? "#ef4444" : "#16a34a", 
          color: "white", padding: "6px 14px", borderRadius: 20, fontWeight: 800, fontSize: 13 
        }}>
          Qty: {qty}
        </div>
      </div>

      <h1 style={{ margin: "12px 0 4px", fontSize: 22, fontWeight: 900 }}>{product.name}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <b style={{ fontSize: 24, color: "#16a34a" }}>₹{product.price}</b>
        <s style={{ color: "#999", fontSize: 14 }}>₹{product.oldPrice || 699}</s>
      </div>

      {/* QTY CONTROLS - ZERO LOGIC */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
        <b style={{ fontSize: 14 }}>Qty:</b>
        <button 
          onClick={handleMinus} 
          style={{ 
            width: 38, height: 38, borderRadius: "50%", border: "1px solid #ddd", 
            background: qty === 0 ? "#f3f4f6" : "white", 
            cursor: "pointer", fontSize: 20, fontWeight: 800,
            opacity: qty === 0 ? 0.5 : 1
          }}
        >
          -
        </button>
        <b style={{ 
          fontSize: 20, minWidth: 30, textAlign: "center",
          color: qty === 0 ? "#ef4444" : "#111",
          background: qty === 0 ? "#fef2f2" : "#f0fdf4",
          padding: "2px 10px", borderRadius: 8
        }}>
          {qty}
        </b>
        <button 
          onClick={handlePlus} 
          style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid #16a34a", background: "#16a34a", color: "white", cursor: "pointer", fontSize: 20, fontWeight: 800 }}
        >
          +
        </button>
        <span style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
          {qty === 0 ? "Click + to add" : `${qty} item${qty > 1 ? 's' : ''} selected`}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button 
          onClick={addToCartAndGo} 
          disabled={qty === 0}
          style={{ 
            flex: 1, 
            background: qty === 0 ? "#9ca3af" : "#16a34a", 
            color: "white", border: "none", padding: "14px", borderRadius: 12, 
            fontWeight: 900, cursor: qty === 0 ? "not-allowed" : "pointer", fontSize: 14 
          }}
        >
          {qty === 0 ? "Add Qty First" : `🛒 Add to Cart - ${qty}`}
        </button>
        <button 
          onClick={addToCartAndGo} 
          disabled={qty === 0}
          style={{ 
            flex: 1, 
            background: qty === 0 ? "#e5e7eb" : "#111", 
            color: qty === 0 ? "#9ca3af" : "white", 
            border: "none", padding: "14px", borderRadius: 12, fontWeight: 900, 
            cursor: qty === 0 ? "not-allowed" : "pointer", fontSize: 14 
          }}
        >
          Buy Now
        </button>
      </div>

      {/* FIXED - LINK TEESI - BUTTON TEXT MATREME */}
      <div style={{ textAlign: "center", marginTop: 16, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 10px" }}>
        <span style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
          {qty === 0 ? "Quantity is zero - Please click + to add quantity. " : ""}
          Please click the button to see the cart 🛒
        </span>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, fontSize: 11, color: "#666", justifyContent: "center" }}>
        <span>🚚 Free Delivery ₹499+</span>
        <span>📦 7 Days Return</span>
        <span>🔒 Secure</span>
      </div>
    </div>
  );
}