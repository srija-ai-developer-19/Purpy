import { useLang } from "../context/LanguageContext.jsx";

export default function Settings() {
  const { lang, setLang, t, dark, setDark, notify, setNotify } = useLang();

  const langs = [
    { code: "en", name: "English", flag: "🇬🇧", desc: "English - Default" },
    { code: "te", name: "Telugu - తెలుగు", flag: "🇮🇳", desc: "Telugu - Full Telugu text" },
    { code: "hi", name: "Hindi - हिंदी", flag: "🇮🇳", desc: "Hindi - Full Hindi text" },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>⚙️ {t("settings")}</h2>
      <p style={{ color: "#666", fontSize: 13 }}>PURPY • Kakinada • Personalize your app</p>

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

      <button onClick={() => window.location.href = "/?view=home"} style={{ width: "100%", padding: 14, background: "#16a34a", color: "white", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", marginTop: 16 }}>✅ {t("save")} - Back To Home</button>
    </div>
  );
}