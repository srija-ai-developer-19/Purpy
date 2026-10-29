// ⭐ PURPY - LOGIN API - DUMMY + REAL ⭐
const USE_REAL_API = false;
const REAL_API_URL = "https://your-backend.com/api";

export async function sendOTP(phone) {
  if (!USE_REAL_API) {
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, message: "OTP Sent - Dummy OTP is 1234" };
  }
  const res = await fetch(`${REAL_API_URL}/send-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone }) });
  return await res.json();
}

export async function verifyOTP(phone, otp) {
  if (!USE_REAL_API) {
    await new Promise((r) => setTimeout(r, 800));
    if (otp === "1234" || otp === "123456" || otp.length === 4) return { success: true };
    return { success: false, message: "Wrong OTP! Try 1234" };
  }
  const res = await fetch(`${REAL_API_URL}/verify-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, otp }) });
  return await res.json();
}

export function logoutUser() {
  localStorage.removeItem("purpyUser");
  localStorage.removeItem("purpyToken");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}

export function getLoggedUser() {
  try { return JSON.parse(localStorage.getItem("purpyUser") || "null"); } catch { return null; }
}