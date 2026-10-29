import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LanguageContext.jsx";

const SUGGESTIONS = [
  "Brinjal 1 Kg", "Tomato 1 Kg", "Potato 1 Kg", "Onion 1 Kg", "Green Chilli",
  "Milk 1 Litre", "Curd 500g", "Basmati Rice 5 Kg", "Toor Dal",
  "Dairy Milk Chocolate", "Biscuits", "Ice Cream", "Maggi Noodles",
  "Shampoo", "Face Wash", "Lipstick", "Kurti", "Saree", "T-Shirt",
  "Earphones", "Chair", "Bed Sheet", "Cricket Bat"
];

export default function HomeSearchBar() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("purpySearchHistory") || "[]"));
  const boxRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = q.trim()
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  const doSearch = (term) => {
    const text = (term || q).trim();
    if (!text) return;
    const h = [text, ...history.filter((x) => x.toLowerCase() !== text.toLowerCase())].slice(0, 5);
    localStorage.setItem("purpySearchHistory", JSON.stringify(h));
    setHistory(h);
    setShow(false);
    window.location.href = `/?view=search&q=${encodeURIComponent(text)}`;
  };

  const clearHistory = () => {
    localStorage.removeItem("purpySearchHistory");
    setHistory([]);
  };

  return (
    <div ref={boxRef} style={{ maxWidth: 900, margin: "12px auto 0", padding: "0 12px", position: "relative", zIndex: 30 }}>
      {/* SEARCH BAR - This is the full bar - Do not delete this div */}
      <div style={{ display: "flex", background: "white", border: "2px solid #16a34a", borderRadius: 30, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
        <span style={{ padding: "12px 0 12px 16px", fontSize: 18 }}>🔍</span>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setShow(true); }}
          onFocus={() => setShow(true)}
          onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
          placeholder={t("search") || "Search for Brinjal, Milk, Rice, Chocolate..."}
          style={{ flex: 1, border: "none", outline: "none", padding: "12px 10px", fontSize: 14, minWidth: 0 }}
        />
        {q && (
          <button onClick={() => setQ("")} style={{ border: "none", background: "none", padding: "0 8px", cursor: "pointer", fontSize: 16 }}>✕</button>
        )}
        <button
          onClick={() => doSearch()}
          style={{ background: "#16a34a", color: "white", border: "none", padding: "0 20px", fontWeight: 800, cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}
        >
          Search
        </button>
      </div>

      {show && (
        <div style={{ position: "absolute", left: 12, right: 12, top: 52, background: "white", border: "1px solid #eee", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", overflow: "hidden" }}>
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <div key={s} onClick={() => doSearch(s)} style={{ padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #f5f5f5", display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                <span>🔍</span> <b>{s}</b>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#16a34a", fontWeight: 800 }}>Search →</span>
              </div>
            ))
          ) : q.trim() ? (
            <div onClick={() => doSearch()} style={{ padding: "12px 16px", cursor: "pointer", fontSize: 14 }}>
              🔍 Search for <b>"{q}"</b>
            </div>
          ) : null}

          {!q.trim() && history.length > 0 && (
            <div style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <b style={{ fontSize: 12 }}>🕒 Recent Searches</b>
                <span onClick={clearHistory} style={{ fontSize: 11, color: "#dc2626", cursor: "pointer", fontWeight: 700 }}>Clear</span>
              </div>
              {history.map((h) => (
                <div key={h} onClick={() => doSearch(h)} style={{ padding: "8px 0", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f5f5f5" }}>🕒 {h}</div>
              ))}
            </div>
          )}

          {!q.trim() && history.length === 0 && (
            <div style={{ padding: "12px 16px", fontSize: 13, color: "#666" }}>
              Type to search - Brinjal, Milk, Rice, Chocolate...
            </div>
          )}
        </div>
      )}
    </div>
  );
}