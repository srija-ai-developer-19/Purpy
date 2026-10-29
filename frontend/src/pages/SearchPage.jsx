import { useState, useEffect, useMemo } from "react";
import { useLang } from "../context/LanguageContext.jsx";
// ✅ CONNECTED - ItemsPage nunchi data - Ippudu Items lo em marchina Search lo reflect avthundhi
import { ALL_IMAGES, NAMES_BY_INDEX } from "./ItemsPage.jsx";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80";
const handleImgError = (e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; };

// --- ItemsPage tho SAME logic - Same Price, Same Name, Same Image ---
function hashFromImage(img) {
  let h = 0;
  for (let k = 0; k < img.length; k++) h = (h * 31 + img.charCodeAt(k)) % 100000;
  return h;
}
function priceFromImage(img, cat) {
  const h = hashFromImage(img);
  if (cat === "grocery") return 19 + (h % 18) * 10 + 1;
  if (cat === "clothes") return 299 + (h % 12) * 100 + 9;
  if (cat === "beauty") return 99 + (h % 16) * 50 + 9;
  if (cat === "electronics") return 1999 + (h % 18) * 500 + 99;
  if (cat === "furniture") return 1999 + (h % 15) * 600 + 99;
  if (cat === "fashion") return 199 + (h % 15) * 100 + 9;
  if (cat === "sports") return 299 + (h % 15) * 200 + 9;
  return 299 + (h % 18) * 100 + 9;
}
function getNameByIndex(icon, index) {
  const list = (NAMES_BY_INDEX && NAMES_BY_INDEX[icon]) || [];
  const myName = list[index];
  if (myName && myName.trim() !== "") return myName;
  const pretty = icon.charAt(0).toUpperCase() + icon.slice(1);
  return pretty + " - Product " + (index + 1);
}
// ItemsPage lo unna anni categories + anni icons nunchi anni products build cheyyi
function buildAllProducts() {
  const out = [];
  if (!ALL_IMAGES) return out;
  Object.keys(ALL_IMAGES).forEach((cat) => {
    const iconsObj = ALL_IMAGES[cat] || {};
    Object.keys(iconsObj).forEach((icon) => {
      const imgs = iconsObj[icon] || [];
      imgs.forEach((img, i) => {
        const price = priceFromImage(img, cat);
        out.push({
          id: `${cat}-${icon}-${i}`,
          name: getNameByIndex(icon, i),
          price: price,
          mrp: price + 200 + ((img.length * 37) % 800),
          brand: "PURPY • " + (icon.charAt(0).toUpperCase() + icon.slice(1)),
          category: cat,
          icon: icon,
          img: img,
          image: img,
          imageUrl: img,
        });
      });
    });
  });
  return out;
}

const CATS = ["All", "grocery", "clothes", "beauty", "electronics", "furniture", "fashion", "sports"];

export default function SearchPage() {
  const { t } = useLang();
  const params = new URLSearchParams(window.location.search);
  const urlQ = params.get("q") || "";
  const [q, setQ] = useState(urlQ);
  const [catFilter, setCatFilter] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("purpyCart") || "[]"));
  const [wish, setWish] = useState(JSON.parse(localStorage.getItem("purpyWishlist") || "[]"));

  useEffect(() => { setQ(urlQ); }, [urlQ]);

  // ✅ Ippudu ALL_PRODUCTS = ItemsPage nunchi vachina anni products - 10 kadhu, 1000+ vastayi
  const ALL_PRODUCTS = useMemo(() => buildAllProducts(), []);

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      const matchQ = !q.trim() || p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()) || p.icon.toLowerCase().includes(q.toLowerCase()) || (p.brand || "").toLowerCase().includes(q.toLowerCase());
      const matchCat = catFilter === "All" || p.category === catFilter;
      return matchQ && matchCat;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount") list = [...list].sort((a, b) => (1 - b.price / b.mrp) - (1 - a.price / a.mrp));
    return list;
  }, [q, catFilter, sort, ALL_PRODUCTS]);

  const normalize = (p) => ({ ...p, _id: p.id, img: p.img || p.image, imageUrl: p.img || p.image, quantity: 1 });
  const addToCart = (p) => {
    const f = cart.find((i) => (i.id || i.name) === p.id);
    let nc;
    if (f) nc = cart.map((i) => (i.id || i.name) === p.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
    else nc = [...cart, normalize(p)];
    setCart(nc);
    localStorage.setItem("purpyCart", JSON.stringify(nc));
  };
  const toggleWish = (p) => {
    const exists = wish.find((i) => (i.id || i.name) === p.id);
    const nw = exists ? wish.filter((i) => (i.id || i.name) !== p.id) : [...wish, normalize(p)];
    setWish(nw);
    localStorage.setItem("purpyWishlist", JSON.stringify(nw));
  };
  const isWished = (id) => wish.some((i) => (i.id || i.name) === id);
  const getQty = (id) => { const f = cart.find((i) => (i.id || i.name) === id); return f ? (f.quantity || 1) : 0; };
  const quickSearch = (term) => { setQ(term); window.location.href = `/?view=search&q=${encodeURIComponent(term)}`; };

  return (
    <div style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 4px" }}>🔍 {t("search") || "Search PURPY"}</h2>
      <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px" }}>{ALL_PRODUCTS.length} products available - Search anything</p>
      <div style={{ display: "flex", background: "white", border: "2px solid #16a34a", borderRadius: 30, overflow: "hidden" }}>
        <span style={{ padding: "12px 0 12px 16px", fontSize: 18 }}>🔍</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") quickSearch(q); }} placeholder="Milk, Shirt, Chocolate, Brinjal... Type here" style={{ flex: 1, border: "none", outline: "none", padding: "12px 10px", fontSize: 15, minWidth: 0 }} />
        {q && <button onClick={() => setQ("")} style={{ border: "none", background: "none", padding: "0 10px", cursor: "pointer", fontSize: 16 }}>✕</button>}
        <button onClick={() => quickSearch(q)} style={{ background: "#16a34a", color: "white", border: "none", padding: "0 20px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>Search</button>
      </div>
      {q.trim() && <p style={{ fontSize: 13, margin: "12px 0 0" }}>Showing results for <b>"{q}"</b> - <b>{filtered.length}</b> Products Found <span onClick={() => setQ("")} style={{ color: "#dc2626", cursor: "pointer", marginLeft: 10, fontWeight: 700 }}>Clear ✕</span></p>}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "6px 14px", borderRadius: 20, border: catFilter === c ? "2px solid #16a34a" : "1px solid #ddd", background: catFilter === c ? "#16a34a" : "white", color: catFilter === c ? "white" : "#111", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "8px 10px", borderRadius: 20, border: "1px solid #ddd", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <option value="relevance">Sort: Relevance</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14, marginTop: 16 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 16, overflow: "hidden", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ position: "relative", background: "#f3f4f6" }}>
              <img src={p.img || p.image || FALLBACK_IMG} onError={handleImgError} onClick={() => (window.location.href = `/?view=product&id=${encodeURIComponent(p.id)}&cat=${p.category}&icon=${p.icon || ""}`)} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", cursor: "pointer", display: "block" }} />
              <span style={{ position: "absolute", top: 10, left: 10, background: "#dc2626", color: "white", fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 20 }}>{Math.round((1 - p.price / p.mrp) * 100)}% OFF</span>
              <button onClick={() => toggleWish(p)} style={{ position: "absolute", top: 8, right: 8, background: "white", border: "1px solid #eee", width: 34, height: 34, borderRadius: "50%", fontSize: 16, cursor: "pointer" }}>{isWished(p.id) ? "❤️" : "🤍"}</button>
            </div>
            <div style={{ padding: 12 }}>
              <b onClick={() => (window.location.href = `/?view=product&id=${encodeURIComponent(p.id)}&cat=${p.category}&icon=${p.icon || ""}`)} style={{ fontSize: 13, cursor: "pointer", lineHeight: 1.3, display: "block", minHeight: 34 }}>{p.name}</b>
              <div style={{ fontSize: 11, color: "#666", margin: "4px 0" }}>{p.brand} • ⭐ 4.5</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><b style={{ color: "#15803d", fontSize: 16 }}>₹{p.price}</b><s style={{ fontSize: 12, color: "#999" }}>₹{p.mrp}</s></div>
              {getQty(p.id) === 0 ? <button onClick={() => addToCart(p)} style={{ background: "#16a34a", color: "white", border: "none", padding: "10px", borderRadius: 10, marginTop: 10, cursor: "pointer", width: "100%", fontWeight: 800, fontSize: 12 }}>+ {t("addToCart")}</button> : <div style={{ background: "#16a34a", color: "white", borderRadius: 10, marginTop: 10, padding: "9px", textAlign: "center", fontWeight: 800, fontSize: 12 }}>✓ {getQty(p.id)} Added</div>}
              <button onClick={() => (window.location.href = `/?view=product&id=${encodeURIComponent(p.id)}&cat=${p.category}&icon=${p.icon || ""}`)} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px", borderRadius: 10, marginTop: 6, cursor: "pointer", width: "100%", fontWeight: 700, fontSize: 12 }}>View Details 👀</button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 50 }}>😢</div><h3>No Products Found for "{q}"</h3><p style={{ color: "#666", fontSize: 13 }}>Try different word - Brinjal, Milk, Rice, Shirt, Chocolate</p><button onClick={() => (window.location.href = "/?view=home")} style={{ marginTop: 16, padding: "12px 24px", background: "#111", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>🏠 Go Home</button></div>}
    </div>
  );
}