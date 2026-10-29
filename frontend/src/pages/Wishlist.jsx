import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext.jsx";

export default function Wishlist() {
  const { t } = useLang();
  const [list, setList] = useState([]);

  const load = () => {
    const saved = JSON.parse(localStorage.getItem("purpyWishlist") || "[]");
    setList(saved);
  };

  useEffect(() => {
    load();
    // If wishlist changes in another tab / page, reload
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  // Get image from any key - img, image, imageUrl, photo
  const getImg = (p) => {
    return p.img || p.image || p.imageUrl || p.photo || p.thumbnail || "";
  };

  const remove = (id) => {
    const updated = list.filter((p) => (p.id || p.name) !== id);
    localStorage.setItem("purpyWishlist", JSON.stringify(updated));
    setList(updated);
  };

  const moveToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
    const idx = cart.findIndex((c) => (c.id || c.name) === (p.id || p.name));
    if (idx >= 0) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    } else {
      cart.push({ ...p, image: getImg(p), img: getImg(p), quantity: 1 });
    }
    localStorage.setItem("purpyCart", JSON.stringify(cart));
    // Remove from wishlist after moving
    remove(p.id || p.name);
    window.location.href = "/?view=cart";
  };

  const addToCartOnly = (p) => {
    const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");
    const idx = cart.findIndex((c) => (c.id || c.name) === (p.id || p.name));
    if (idx >= 0) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    } else {
      cart.push({ ...p, image: getImg(p), img: getImg(p), quantity: 1 });
    }
    localStorage.setItem("purpyCart", JSON.stringify(cart));
    alert(`${p.name} added to Cart!`);
  };

  if (list.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 60 }}>❤️</div>
        <h2>Wishlist is Empty</h2>
        <p style={{ color: "#666" }}>Tap ❤️ on any product to save it here.</p>
        <button
          onClick={() => (window.location.href = "/?view=home")}
          style={{ padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", marginTop: 12 }}
        >
          🏠 Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2>❤️ {t("wishlist")} ({list.length})</h2>
      <p style={{ color: "#666", fontSize: 13, marginTop: -6 }}>Your saved items. Move to cart anytime.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginTop: 16 }}>
        {list.map((p, i) => {
          const img = getImg(p);
          const id = p.id || p.name;
          return (
            <div key={id + i} style={{ background: "white", border: "1px solid #eee", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* IMAGE - Fixed size, fallback if no image */}
              <div
                onClick={() => (window.location.href = `/?view=product&id=${encodeURIComponent(p.id || p.name)}`)}
                style={{ height: 160, background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  />
                ) : null}
                <div style={{ display: img ? "none" : "flex", fontSize: 48, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                  {p.emoji || "🥬"}
                </div>
              </div>

              <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column" }}>
                <b style={{ fontSize: 14, lineHeight: 1.3 }}>{p.name}</b>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  {p.weight || p.qty || p.unit || "1 Kg"} • {p.category || "Grocery"}
                </div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <b style={{ fontSize: 16 }}>₹{p.price}</b>
                  {p.mrp && p.mrp > p.price && (
                    <span style={{ fontSize: 12, color: "#999", textDecoration: "line-through" }}>₹{p.mrp}</span>
                  )}
                  {p.mrp && p.mrp > p.price && (
                    <span style={{ fontSize: 11, background: "#dcfce7", color: "#16a34a", padding: "2px 6px", borderRadius: 8, fontWeight: 800 }}>
                      {Math.round((1 - p.price / p.mrp) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => moveToCart(p)}
                    style={{ flex: 1, padding: 10, background: "#111", color: "white", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 12 }}
                  >
                    🛒 Move to Cart
                  </button>
                  <button
                    onClick={() => remove(id)}
                    style={{ padding: "10px 12px", background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 12 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => (window.location.href = "/?view=home")}
        style={{ width: "100%", padding: 14, background: "#16a34a", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", marginTop: 20 }}
      >
        🏠 Continue Shopping
      </button>
    </div>
  );
}