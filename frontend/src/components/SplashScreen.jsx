import { useState, useEffect } from "react";
export default function SplashScreen({ onDone }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPage(1), 15000);
    const t2 = setTimeout(() => onDone(), 30000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  const emojis = [
    { e: "🥦", pos: { top: "10%", left: "14%" } },
    { e: "👕", pos: { top: "10%", right: "14%" } },
    { e: "💄", pos: { top: "38%", left: "5%" } },
    { e: "📱", pos: { top: "38%", right: "5%" } },
    { e: "🍎", pos: { top: "62%", left: "10%" } },
    { e: "🍫", pos: { top: "62%", right: "10%" } },
    { e: "👜", pos: { bottom: "10%", left: "18%" } },
    { e: "⚽", pos: { bottom: "10%", right: "18%" } },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "linear-gradient(135deg, #16a34a, #22c55e, #14532d)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`@keyframes swingOne{0%{transform:rotate(-18deg) translateY(0)}50%{transform:rotate(18deg) translateY(-8px)}100%{transform:rotate(-18deg) translateY(0)}} @keyframes popP{0%{transform:scale(0.4);opacity:0}60%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}} @keyframes emojiPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes loadBar{0%{width:0%}100%{width:100%}}`}</style>
      {page === 0 && (<div style={{ textAlign: "center", animation: "popP 0.8s ease forwards" }}><div style={{ width: 180, height: 180, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.4)", border: "8px solid #dcfce7", margin: "0 auto" }}><b style={{ fontSize: 110, fontWeight: 900, color: "#16a34a" }}>P</b></div><h1 style={{ color: "white", fontSize: 42, fontWeight: 900, letterSpacing: 6, margin: "18px 0 4px" }}>PURPY.</h1><p style={{ color: "#dcfce7", fontSize: 13, fontWeight: 700, margin: 0 }}>Kakinada • 10 Mins Delivery</p></div>)}
      {page === 1 && (<>
        {emojis.map((it, i) => (<div key={i} style={{ position: "absolute", ...it.pos, animation: `emojiPop 0.5s ease forwards, swingOne 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s`, transformOrigin: "top center", opacity: 0, textAlign: "center", zIndex: 2 }}><div style={{ width: 2, height: 18, background: "rgba(255,255,255,0.8)", margin: "0 auto" }}></div><div style={{ width: 88, height: 88, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, boxShadow: "0 10px 25px rgba(0,0,0,0.35)", border: "3px solid #dcfce7" }}>{it.e}</div></div>))}
        <div style={{ textAlign: "center", animation: "popP 0.6s ease forwards", position: "relative", zIndex: 3 }}><div style={{ width: 150, height: 150, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 15px 40px rgba(0,0,0,0.4)", border: "6px solid #dcfce7", margin: "0 auto" }}><b style={{ fontSize: 90, fontWeight: 900, color: "#16a34a" }}>P</b></div><h1 style={{ color: "white", fontSize: 36, fontWeight: 900, letterSpacing: 4, margin: "14px 0 4px" }}>PURPY.</h1><p style={{ color: "#dcfce7", fontSize: 13, fontWeight: 700, margin: 0 }}>Kakinada • 10 Mins Delivery • Fresh • Best Price</p></div>
        <div style={{ width: 180, height: 6, background: "rgba(255,255,255,0.3)", borderRadius: 20, marginTop: 26, overflow: "hidden" }}><div style={{ height: "100%", background: "white", borderRadius: 20, animation: "loadBar 15s linear forwards" }}></div></div>
      </>)}
    </div>
  );
}