import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let found = null;
    try { const all = JSON.parse(localStorage.getItem("purpyProducts") || "[]"); found = all.find((p) => String(p.id) === String(id)); } catch (e) {}
    const demos = {
      "1": { id: 1, name: "Fresh Tomatoes 1kg", price: 24, oldPrice: 49, off: "51% OFF", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80", desc: "Fresh - Daily - From Kakinada Farm - 10 Mins Delivery", cat: "Grocery" },
      "2": { id: 2, name: "Fresh Milk 1L", price: 54, oldPrice: 64, off: "15% OFF", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80", desc: "Pure Cow Milk - Daily Fresh - Chilled - 10 Mins Delivery", cat: "Grocery" },
      "3": { id: 3, name: "Basmati Rice 5kg", price: 449, oldPrice: 699, off: "36% OFF", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80", desc: "Premium Basmati - Long Grain - Best Quality - Kakinada", cat: "Grocery" },
      "4": { id: 4, name: "Fresh Vegetables Combo", price: 99, oldPrice: 199, off: "50% OFF", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80", desc: "Combo - Tomato, Onion, Potato, Brinjal - Fresh Daily", cat: "Grocery" },
    };
    if (found) setProduct({ ...found, img: found.img || found.image || demos["1"].img, oldPrice: found.oldPrice || found.price + 50, desc: found.desc || found.description || "Fresh - Best Quality - Kakinada - 10 Mins Delivery", cat: found.cat || found.category || "Grocery" });
    else if (demos[String(id)]) setProduct(demos[String(id)]);
    else setProduct({ id: id || 1, name: "Fresh Tomatoes 1kg", price: 24, oldPrice: 49, off: "51% OFF", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80", desc: "Fresh - Best Quality - Kakinada - 10 Mins Delivery", cat: "Grocery" });
  }, []);
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
    const ex = cart.find((p) => String(p.id) === String(product.id));
    if (ex) ex.quantity = (ex.quantity || 1) + qty; else cart.push({ ...product, quantity: qty });
    localStorage.setItem("purpyCart", JSON.stringify(cart));
    alert(`✅ ${product.name} - Added to Cart!`);
    purpyGo("/?view=cart");
  };
  if (!product) return <div style={{ padding: 40, textAlign: "center" }}>Loading Product...</div>;
  let userName = "Srija", userPhone = "99666 12345", userAddr = "Main Road, Kakinada, Andhra Pradesh - 533001";
  try { const u = JSON.parse(localStorage.getItem("purpyUser") || "null"); if (u) { userName = u.name || userName; userPhone = u.phone || userPhone; userAddr = u.address || userAddr; } } catch (e) {}
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "14px 12px 30px" }}>
      <span onClick={() => purpyGo("/?view=home")} style={{ cursor: "pointer", fontSize: 13, color: "#16a34a", fontWeight: 700 }}>← Back to Home</span>
      <div style={{ marginTop: 12, borderRadius: 16, overflow: "hidden", height: 340, background: "#f3f4f6" }}><img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
      <div style={{ marginTop: 14 }}>
        <span style={{ fontSize: 11, background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: 12, fontWeight: 700 }}>{product.cat}</span>
        {product.off && <span style={{ fontSize: 11, background: "#dc2626", color: "white", padding: "4px 10px", borderRadius: 12, fontWeight: 800, marginLeft: 8 }}>{product.off}</span>}
        <h1 style={{ margin: "10px 0 4px", fontSize: 22, fontWeight: 900 }}>{product.name}</h1>
        <div><b style={{ fontSize: 24, color: "#16a34a" }}>₹{product.price}</b> <s style={{ color: "#999", marginLeft: 6 }}>₹{product.oldPrice}</s> <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 700 }}>You Save ₹{product.oldPrice - product.price}</span></div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginTop: 10 }}>{product.desc}</p>
        <div style={{ display: "flex", gap: 8, marginTop: 12, fontSize: 12, fontWeight: 700, flexWrap: "wrap" }}>
          <span style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 10px", borderRadius: 12 }}>⚡ 10 Mins Delivery</span>
          <span style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 10px", borderRadius: 12 }}>🚚 Free Delivery ₹499+</span>
          <span style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 10px", borderRadius: 12 }}>↩️ 7 Days Return</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <b>Qty:</b>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #ddd", background: "white", fontSize: 18, cursor: "pointer" }}>-</button>
          <b style={{ fontSize: 16 }}>{qty}</b>
          <button onClick={() => setQty(qty + 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #ddd", background: "white", fontSize: 18, cursor: "pointer" }}>+</button>
          <b style={{ marginLeft: 8 }}>Total: ₹{product.price * qty}</b>
        </div>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: 14, marginTop: 16 }}>
          <b style={{ fontSize: 14 }}>👤 Delivery Details - Customer</b>
          <div style={{ fontSize: 13, lineHeight: 1.7, marginTop: 6, color: "#333" }}><div>👤 <b>Name:</b> {userName}</div><div>📞 <b>Phone:</b> {userPhone}</div><div>📍 <b>Address:</b> {userAddr}</div></div>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#666" }}>To change address, go to Account &gt; Edit Details</p>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={addToCart} style={{ flex: 1, background: "#16a34a", color: "white", border: "none", padding: "13px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>🛒 Add to Cart - ₹{product.price * qty}</button>
          <button onClick={() => addToCart()} style={{ flex: 1, background: "#111", color: "white", border: "none", padding: "13px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>Buy Now →</button>
        </div>
      </div>
    </div>
  );
}