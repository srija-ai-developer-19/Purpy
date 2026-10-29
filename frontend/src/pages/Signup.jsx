import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handle = (e) => {
    e.preventDefault();
    setMsg("");

    // ⭐ NAME - CHECK - Number - Aithe - Save - Cheyaku - 1250 - Ravadu ⭐
    if (!form.name.trim()) return setMsg("❌ Please Enter Your Full Name");
    if (!isNaN(Number(form.name.trim()))) return setMsg("❌ Please Enter Your Real Name - Not Number");
    if (form.name.trim().length < 3) return setMsg("❌ Name Must Be Minimum 3 Characters");

    if (form.phone.length !== 10) return setMsg("❌ Please Enter 10 Digit Mobile Number");
    if (!form.email.includes("@")) return setMsg("❌ Please Enter a Valid Email");
    if (form.password.length < 4) return setMsg("❌ Password Must Be Minimum 4 Characters");
    if (form.password !== form.confirm) return setMsg("❌ Passwords Do Not Match");
    if (!agree) return setMsg("❌ Please Agree to Privacy Policy & Terms of Use");

    setLoading(true);

    setTimeout(() => {
      // ⭐ NAME - Clean - Chesi - Save - Chesthunna - First Letter - Capital ⭐
      const cleanName = form.name.trim().replace(/\s+/g, " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

      const userData = {
        id: Date.now(),
        name: cleanName, // ⭐ Ex: srija -> Srija - 1250 - Radhu ⭐
        phone: form.phone,
        email: form.email.trim().toLowerCase(),
        wallet: 1250,
        goldCoins: 320,
        vouchers: [{ code: "PURPY100", discount: 100 }],
      };

      // ⭐ SAVE - Logout - Cheshe - Varaku - Untundi ⭐
      localStorage.setItem("purpyUser", JSON.stringify(userData));
      localStorage.setItem("purpyToken", "purpy-demo-token");
      localStorage.setItem("token", "purpy-demo-token");
      localStorage.setItem("authToken", "purpy-demo-token");
      localStorage.setItem("purpyWallet", JSON.stringify({ balance: 1250, goldCoins: 320 }));

      setLoading(false);
      alert(`Welcome ${cleanName}! 🎉 Signup Successful! You Won ₹100 Voucher + 320 Gold Coins!`);
      nav("/");
    }, 800);
  };

  return (
    <main className="login-page">
      <div className="login-top-icons">
        <span>🥦</span><span>🍎</span><span>🥛</span><span>🛒</span><span>👗</span><span>💄</span><span>📱</span><span>🍫</span>
      </div>

      <form className="login-card" onSubmit={handle}>
        <div className="login-logo-wrap">
          <div className="login-logo">🎉</div>
          <h1>Join PURPY <span>•</span></h1>
          <p>Create Account - Get ₹100 Voucher Free!</p>
          <div className="login-badges"><span>🎁 ₹100 OFF First Order</span><span>🪙 320 Gold Coins Free</span></div>
        </div>

        <div className="login-body">
          <label>👤 Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Enter Full Name"
            autoComplete="name"
            required
          />

          <label>📱 Mobile Number</label>
          <div className="phone-box">
            <span>+91</span>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) }))}
              placeholder="Enter Mobile Number"
              inputMode="numeric"
              autoComplete="tel"
              required
            />
          </div>

          <label>✉️ Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            placeholder="Enter Email Address"
            autoComplete="email"
            required
          />

          <label>🔒 Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={change}
            placeholder="Enter Password"
            autoComplete="new-password"
            required
          />

          <label>🔒 Confirm Password</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={change}
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />

          {/* ⭐ PRIVACY - SPACE FIX ⭐ */}
          <label className="agree-box">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>I have read and agree to the <Link to="/privacy-policy">Privacy Policy</Link> & <Link to="/terms-of-use">Terms of Use</Link></span>
          </label>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account 🎉"}
          </button>
        </div>

        {msg && <p className="login-error">{msg}</p>}

        <p className="login-footer">Already have an account? <Link to="/login">Login</Link></p>
        <p className="login-copy">© 2026 PURPY • Kakinada</p>
      </form>
    </main>
  );
}