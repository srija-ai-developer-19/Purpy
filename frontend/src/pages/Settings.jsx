import { useLang } from "../context/LanguageContext.jsx";
import { purpyGo } from "../App.jsx";

export default function Settings() {
  const { lang, setLang, t, dark, setDark, notify, setNotify } = useLang();

  // USER CHECK
  let user = null;
  try {
    const raw = localStorage.getItem("purpyUser");
    if (raw) user = JSON.parse(raw);
  } catch { user = null; }

  const langs = [
    { code: "en", name: "English", flag: "🇬🇧", desc: "English - Default" },
    { code: "te", name: "Telugu - తెలుగు", flag: "🇮🇳", desc: "Telugu - Full Telugu text" },
    { code: "hi", name: "Hindi - हिंदी", flag: "🇮🇳", desc: "Hindi - Full Hindi text" },
  ];

  const handleLogout = () => {
    if (!confirm(t("logout") + " - Confirm?")) return;

    // Current user phone save chesuko - user specific data clear avvakudadu next login kosam
    const phone = user?.phone || null;

    // Session clear - Ippudu logout ayyaka orders kanipinchavu
    localStorage.removeItem("purpyUser");
    localStorage.removeItem("purpyToken");
    localStorage.removeItem("purpyWallet");
    
    // Common keys clear - Header lo user lekapothe 0 chupistundi
    localStorage.removeItem("purpyCart");
    localStorage.removeItem("purpyWishlist");
    localStorage.removeItem("purpyOrders");
    localStorage.removeItem("purpySelectedProduct");
    localStorage.removeItem("purpyLastItems");

    // Note: purpyOrders_9966XXXXXX lanti user keys delete cheyamu - next login ki same user vasthe orders malli vasthayi
    // Nuvvu permanently delete cheyyali ante kinda line uncomment cheyyi:
    // if(phone) { localStorage.removeItem(`purpyOrders_${phone}`); localStorage.removeItem(`purpyCart_${phone}`); localStorage.removeItem(`purpyWishlist_${phone}`); }

    window.location.href = "/?view=home";
  };

  const clearAllData = () => {
    if (!confirm("All App Data Clear Cheyala? Orders, Cart, Wishlist anni pothayi!")) return;
    localStorage.clear();
    window.location.href = "/?view=home";
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>⚙️ {t("settings")}</h2>
      <p style={{ color: "#666", fontSize: 13 }}>PURPY • Kakinada • Personalize your app</p>

      {/* USER ACCOUNT CARD */}
      <div style={{ background: user ? "#f0fdf4" : "#fef3c7", border: `1px solid ${user ? "#bbf7d0" : "#fde68a"}`, borderRadius: 16, padding: 16, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <b style={{ fontSize: 14 }}>{user ? `👤 ${user.name}` : "👤 Guest User"}</b>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{user ? `📞 ${user.phone}` : "Login avvale"}</div>
          <div style={{ fontSize: 11, color: user ? "#16a34a" : "#d97706", marginTop: 2, fontWeight: 700 }}>{user ? "✅ Logged In - Orders safe" : "🔒 Login cheste orders save avthayi"}</div>
        </div>
        {user ? (
          <button onClick={handleLogout} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: "#dc2626", color: "white", fontWeight: 800, cursor: "pointer" }}>Logout</button>
        ) : (
          <button onClick={() => purpyGo("/?view=account")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: "#111", color: "white", fontWeight: 800, cursor: "pointer" }}>Login</button>
        )}
      </div>

      <div style={{ background: "#e0f2fe", border: "1px solid #7dd3fc", borderRadius: 12, padding: 12, marginTop: 12, fontSize: 13 }}>
        <b>Live Preview:</b> {t("home")} | {t("cart")} | {t("orders")} | {t("checkout")} | {t("placeOrder")}
        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>If this line changes when you click below, language is working.</div>
      </div>

      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 12 }}>
        <h3 style={{ margin: "0 0 4px" }}>🌐 {t("language")}</h3>
        <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px" }}>Select once, Header + Settings change instantly. Saved forever.</p>
        {langs.map((l) => (
          <div
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: 12, borderRadius: 12, marginBottom: 8, cursor: "pointer",
              border: lang === l.code ? "2px solid #16a34a" : "1px solid #eee",
              background: lang === l.code ? "#f0fdf4" : "white",
            }}
          >
            <div><b>{l.flag} {l.name}</b><div style={{ fontSize: 12, color: "#666" }}>{l.desc}</div></div>
            <span style={{ fontSize: 20 }}>{lang === l.code ? "✅" : "⭕"}</span>
          </div>
        ))}
        <p style={{ fontSize: 12, background: "#f0fdf4", padding: 8, borderRadius: 8 }}>
          Current: <b>{lang === "en" ? "English" : lang === "te" ? "Telugu - తెలుగు" : "Hindi - हिंदी"}</b>
        </p>
      </div>

      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><b>🌙 {t("darkMode")}</b><div style={{ fontSize: 12, color: "#666" }}>Dark background for night use</div></div>
        <button onClick={() => setDark(!dark)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: dark ? "#16a34a" : "#ddd", color: dark ? "white" : "#111", fontWeight: 800, cursor: "pointer" }}>{dark ? "ON" : "OFF"}</button>
      </div>

      <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 16, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><b>🔔 {t("notifications")}</b><div style={{ fontSize: 12, color: "#666" }}>Order updates, offers, delivery alerts</div></div>
        <button onClick={() => { setNotify(!notify); localStorage.setItem("purpyNotify", !notify ? "1" : "0"); }} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: notify ? "#16a34a" : "#ddd", color: notify ? "white" : "#111", fontWeight: 800, cursor: "pointer" }}>{notify ? "ON" : "OFF"}</button>
      </div>

      {/* DANGER ZONE */}
      <div style={{ background: "white", border: "1px solid #fecaca", borderRadius: 16, padding: 16, marginTop: 12 }}>
        <h3 style={{ margin: "0 0 8px", color: "#dc2626", fontSize: 14 }}>⚠️ Data Management</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={clearAllData} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #fecaca", background: "white", color: "#dc2626", fontWeight: 800, cursor: "pointer", fontSize: 12 }}>🗑️ Clear All Data</button>
          {user && <button onClick={handleLogout} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "#dc2626", color: "white", fontWeight: 800, cursor: "pointer", fontSize: 12 }}>🚪 Logout</button>}
        </div>
        <p style={{ fontSize: 11, color: "#666", margin: "8px 0 0" }}>Logout cheste orders, cart Header lo 0 avthayi. Same number tho login chesthe orders malli vasthayi.</p>
      </div>

      <button onClick={() => window.location.href = "/?view=home"} style={{ width: "100%", padding: 14, background: "#16a34a", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", marginTop: 16 }}>✅ {t("save")} - Back To Home</button>
    </div>
  );
}