import { useState, useEffect } from "react";
import { purpyGo, API_URL } from "../App.jsx";
export default function Home() {
  const [deals, setDeals] = useState([]);
  const [slide, setSlide] = useState(0);
  const banners = [
    { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80", title: "Shop Everything in Kakinada", sub: "Grocery • Clothes • Electronics • 10 Mins Delivery", btn: "Shop Now →" },
    { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80", title: "Fresh Grocery - Daily Fresh", sub: "Vegetables • Fruits • Milk • 10 Mins Delivery", btn: "Shop Grocery →" },
    { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80", title: "Fashion Fest - Up to 50% OFF", sub: "Clothes • Fashion • Beauty • Best Price", btn: "Shop Fashion →" },
    { img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1400&q=80", title: "Beauty & Care - Up to 40% OFF", sub: "Skincare • Makeup • Perfume • 10 Mins Delivery", btn: "Shop Beauty →" },
    { img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80", title: "Electronics - Best Deals", sub: "Mobiles • Laptops • TV • Watches • Best Price", btn: "Shop Electronics →" },
  ];
  useEffect(() => { const t = setInterval(() => setSlide((s) => (s + 1) % banners.length), 3500); return () => clearInterval(t); }, [banners.length]);

  const footballImg = "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=800";
  const fallbackImg = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80";
  const handleImgError = (e) => {
    e.target.onerror = null;
    if ((e.target.alt || "").toLowerCase().includes("football")) e.target.src = footballImg;
    else e.target.src = fallbackImg;
  };

  useEffect(() => {
    const fallback = [
      { id: 1, name: "Fresh Tomatoes 1kg", price: 24, oldPrice: 49, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80", off: "51% OFF" },
      { id: 2, name: "Fresh Milk 1L", price: 54, oldPrice: 64, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80", off: "15% OFF" },
      { id: 3, name: "Basmati Rice 5kg", price: 449, oldPrice: 699, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80", off: "36% OFF" },
      { id: 4, name: "Fresh Vegetables Combo", price: 99, oldPrice: 199, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80", off: "50% OFF" },
      { id: 5, name: "Football", price: 599, oldPrice: 899, img: footballImg, off: "33% OFF" },
    ];
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.products || []);
          if (list && list.length > 0) {
            const mapped = list.slice(0, 5).map((p) => ({
              id: p._id || p.id,
              _id: p._id || p.id,
              name: p.name,
              price: p.price,
              oldPrice: p.oldPrice || p.mrp || p.price,
              img: (p.name || "").toLowerCase().includes("football") ? footballImg : (p.img || p.image || p.images?.[0] || fallbackImg),
              off: p.off || (p.oldPrice ? `${Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF` : ""),
              category: p.category,
              stock: p.stock,
            }));
            setDeals(mapped);
            return;
          }
        }
      } catch (e) {}
      try {
        const all = JSON.parse(localStorage.getItem("purpyProducts") || "[]");
        if (all && all.length > 0) {
          const fixed = all.slice(0, 5).map((p) => ({
            ...p,
            img: (p.name || "").toLowerCase().includes("football") ? footballImg : (p.img || p.image || p.images?.[0] || fallbackImg),
          }));
          setDeals(fixed);
        } else setDeals(fallback);
      } catch (e) { setDeals(fallback); }
    };
    load();
  }, []);
  const cats = [
    { name: "Grocery", img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80", key: "grocery" },
    { name: "Clothes", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", key: "clothes" },
    { name: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", key: "electronics" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", key: "beauty" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", key: "fashion" },
    { name: "Sports", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", key: "sports" },
    { name: "Furniture", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", key: "furniture" },
  ];
  const goCat = (k) => purpyGo(`/?view=category&cat=${k}`);
  const goItems = () => purpyGo(`/?view=items`);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px 30px" }}>
      {/* FIXED BANNER - ONLY PURPY - NO 100 OFF - NO COPY CODE - Free Order Above 499 Kakinada */}
      <div style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", borderRadius: 16, padding: "14px 16px", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
        <div style={{ textAlign: "center" }}><b style={{ fontSize: 18, letterSpacing: 0.5 }}>🛒 PURPY. - Free Order Above ₹499 - Kakinada</b></div>
      </div>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, marginTop: 10, padding: "12px 10px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, textAlign: "center" }}>
        <div><div style={{ fontSize: 20 }}>🚚</div><b style={{ fontSize: 11 }}>Free Delivery</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Above ₹499</p></div>
        <div><div style={{ fontSize: 20 }}>⚡</div><b style={{ fontSize: 11 }}>10 Mins</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Kakinada</p></div>
        <div><div style={{ fontSize: 20 }}>↩️</div><b style={{ fontSize: 11 }}>7 Days</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Easy Return</p></div>
        <div><div style={{ fontSize: 20 }}>💵</div><b style={{ fontSize: 11 }}>COD</b><p style={{ margin: 0, fontSize: 10, color: "#666" }}>Cash Available</p></div>
      </div>
      <div style={{ marginTop: 14, borderRadius: 18, overflow: "hidden", cursor: "pointer", position: "relative", height: "clamp(220px, 55vw, 380px)", background: "#111", width: "100%" }} onClick={goItems}>
        {banners.map((b, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: slide === i ? 1 : 0, transition: "opacity 0.6s", pointerEvents: slide === i ? "auto" : "none" }}>
            <img src={b.img} alt={b.title} onError={handleImgError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.9 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))" }}></div>
            <div style={{ position: "absolute", left: 20, bottom: 36, color: "white", right: 20, zIndex: 2 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 900, textShadow: "0 2px 8px rgba(0,0,0,0.6)", lineHeight: 1.2 }}>{b.title}</h2>
              <p style={{ margin: "8px 0 0", fontSize: 14 }}>{b.sub}</p>
              <span style={{ display: "inline-block", marginTop: 12, background: "#16a34a", padding: "9px 20px", borderRadius: 20, fontSize: 14, fontWeight: 800 }}>{b.btn}</span>
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 3 }}>
          {banners.map((_, i) => (<span key={i} onClick={(e) => { e.stopPropagation(); setSlide(i); }} style={{ width: slide === i ? 24 : 9, height: 9, borderRadius: 10, background: slide === i ? "white" : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "0.3s", display: "block" }}></span>))}
        </div>
      </div>
      <div style={{ marginTop: 28, marginBottom: 4, textAlign: "center" }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: 1, color: "#111" }}>SHOP BY <span style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", padding: "4px 14px", borderRadius: 20 }}>PURPY.</span></h3>
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#666", fontWeight: 600 }}>7 Categories • Everything You Need • Kakinada</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 16, marginTop: 22, padding: "10px 6px 14px" }}>
        {cats.map((c) => (
          <div key={c.key} onClick={() => goCat(c.key)} style={{ cursor: "pointer", textAlign: "center" }}>
            <div style={{ width: "100%", aspectRatio: "1", maxWidth: 130, borderRadius: "50%", overflow: "hidden", margin: "0 auto", border: "3px solid #dcfce7", boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}><img src={c.img} alt={c.name} onError={handleImgError} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <b style={{ fontSize: 13, display: "block", marginTop: 10 }}>{c.name}</b>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
        <div><h3 style={{ margin: 0, fontSize: 19, fontWeight: 900 }}>Deals of the Day</h3><p style={{ margin: "2px 0 0", fontSize: 12, color: "#666" }}>Kakinada • Today Only</p></div>
        <span onClick={goItems} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 800, fontSize: 13 }}>View All →</span>
      </div>
      <div className="deals-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 16 }}>
        {deals.map((d) => (
          <div key={d.id} onClick={() => { localStorage.setItem("purpySelectedProduct", JSON.stringify(d)); purpyGo(`/?view=product&id=${d.id}`); }} style={{ cursor: "pointer", background: "white", borderRadius: 14, overflow: "hidden", border: "1px solid #eee", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", minWidth: 0 }}>
            <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#f3f4f6" }}>
              <img src={d.img} alt={d.name} onError={handleImgError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {d.off && <span style={{ position: "absolute", top: 8, left: 8, background: "#dc2626", color: "white", fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 6 }}>{d.off}</span>}
            </div>
            <div style={{ padding: 12 }}><b style={{ fontSize: 13, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</b><div style={{ marginTop: 6 }}><b style={{ fontSize: 15, color: "#16a34a" }}>₹{d.price}</b> <s style={{ fontSize: 12, color: "#999" }}>₹{d.oldPrice}</s></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}