import { useState } from "react";
import { purpyGo } from "../App.jsx";

export default function Footer({ onOpenAI }) {
  const [open, setOpen] = useState(null);
  const [policy, setPolicy] = useState(null);
  const toggle = (name) => setOpen(open === name ? null : name);
  const go = (v) => purpyGo(`/?view=${v}`);
  const goCat = (cat) => purpyGo(`/?view=category&cat=${cat}`);
  const linkStyle = { cursor: "pointer", fontSize: 13, color: "#444", padding: "6px 0 6px 8px", display: "block", background: "transparent", fontWeight: 400 };
  const headStyle = { margin: 0, fontSize: 13, fontWeight: 900, color: "#111", padding: "12px 8px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", borderBottom: "1px solid #d1fae5" };
  const arrowStyle = (isOpen) => ({ fontSize: 12, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", color: "#16a34a", fontWeight: 900 });

  // ✅ ALL POLICIES - FULL ENGLISH - Professional - Play Store Ready
  const policies = {
    terms: {
      title: "📜 Terms & Conditions",
      text: `Welcome to PURPY. By using our app / website, you agree to the following Terms & Conditions. Please read them carefully.

1. ABOUT PURPY.
PURPY. is an online shopping platform for Kakinada. We deliver Grocery, Clothes, Electronics, Beauty, Fashion, Sports and Furniture. Delivery is available only in Kakinada - 533001, 533002, 533003.

2. ORDERS
When you place an order, you will receive an order confirmation. If a product is out of stock, we will cancel the order and issue a full refund. We reserve the right to cancel any order in case of incorrect pricing, stock issues, or suspected fraud.

3. PRICES & OFFERS
All prices shown in the app are final. There are no hidden charges. Delivery is FREE on orders above ₹499. Below ₹499, a delivery charge of ₹30 applies.
Offer Code PURPY100 gives ₹100 OFF on your first order above ₹499. One offer per customer. PURPY. reserves the right to change or stop any offer at any time.

4. PAYMENT
We accept Cash on Delivery (COD), UPI, Debit / Credit Card and PURPY Wallet. All online payments are processed through secure payment gateways. We do not store your card details.

5. ACCOUNT
You are responsible for keeping your account and OTP safe. Do not share your OTP or password with anyone. PURPY. will never ask for your OTP.

6. DELIVERY
Our average delivery time is 10 minutes in Kakinada. Delivery may be delayed due to traffic, rain or high demand. Delivery timings are 8 AM to 10 PM.

7. MISUSE
Fake orders, fake returns, or misuse of offers may result in account suspension or permanent blocking without prior notice.

8. CHANGES
PURPY. may update these Terms at any time. Continued use of the app means you accept the updated Terms.

Last Updated: January 2026.`
    },
    privacy: {
      title: "🔒 Privacy Policy",
      text: `At PURPY., we respect your privacy. This policy explains what data we collect and how we use it.

1. WHAT WE COLLECT
- Name, Phone Number, Email Address (if provided)
- Delivery Address
- Order History, Cart and Wishlist
- Device information and location (only to check delivery availability in Kakinada)

2. HOW WE USE YOUR DATA
Your data is used only for:
- Order delivery and order updates
- OTP verification and customer support
- Offers, refunds and wallet transactions
We never sell your personal data to anyone.

3. PHONE NUMBER
Your phone number is used only for OTP and order updates. We do not send spam messages.

4. ADDRESS
Your address is shared only with the delivery partner assigned to your order, for delivery purpose only.

5. PAYMENT DATA
We do not store your card, UPI PIN or bank details. All payments are handled by secure payment gateways.

6. LOCATION
Location is used only to confirm whether delivery is available in your area. We do not track you continuously.

7. DATA DELETION
You can request deletion of your account and data from Settings or by contacting us on WhatsApp at 99666 12345 or email at help@purpy.in. Your data will be deleted within 24 hours of verification.

8. CONTACT
For any privacy concern, contact us at help@purpy.in.

Last Updated: January 2026.`
    },
    refund: {
      title: "↩️ Refund & Return Policy",
      text: `1. 7 DAYS RETURN
If you are not satisfied with a product or if it is damaged, you can return it within 7 days of delivery.

2. RETURN CONDITION
The product must be in its original packing, unused and in good condition.
Grocery, Food, Milk and perishable items cannot be returned after opening, except in case of damage, expired or wrong item delivery.

3. HOW TO RETURN
Go to My Orders > Select Order > Return > Select Reason. Our team will arrange pickup within 24 to 48 hours. After checking the product, refund will be initiated.

4. REFUND TIMELINE
- UPI / Card: 3 to 5 working days to your bank account
- Cash on Delivery (COD): 3 to 5 working days to Wallet or Bank
- PURPY Coins / Wallet: Instant credit to your PURPY Wallet

5. DAMAGED / WRONG ITEM
If you receive a damaged or wrong item, please upload a photo in the return request. You will get a full refund including delivery charges.

6. NON-RETURNABLE ITEMS
For hygiene reasons, opened Beauty, personal care and food items are non-returnable unless damaged or expired.

7. CONTACT
If your return is delayed, contact AI Help Desk in the app or WhatsApp at 99666 12345 (9 AM - 9 PM).

Last Updated: January 2026.`
    },
    shipping: {
      title: "🚚 Shipping & Delivery Policy",
      text: `1. DELIVERY AREA
We currently deliver only in Kakinada - 533001, 533002, 533003. Delivery outside Kakinada is not available yet.

2. DELIVERY TIME
Average delivery time is 10 minutes. During traffic, rain or peak hours, delivery may take 20 to 30 minutes. You will be notified in the app if there is a delay.

3. DELIVERY CHARGES
- Orders above ₹499: FREE Delivery
- Orders below ₹499: ₹30 Delivery Charge

4. DELIVERY PROCESS
After placing an order, our delivery partner will call you. Please keep your phone reachable. If you are not available, we will try 2 times, after which the order will be cancelled.

5. LIVE TRACKING
You can track your order live in My Orders. Delivery partner name and phone number will be visible after order confirmation.

6. DELIVERY TIMINGS
Delivery is available from 8 AM to 10 PM, all days including Sundays.

7. CONTACT
For delivery issues, contact AI Help Desk or WhatsApp at 99666 12345.

Last Updated: January 2026.`
    },
    cancel: {
      title: "❌ Cancellation Policy",
      text: `1. CANCEL BY CUSTOMER
You can cancel your order for FREE from My Orders, before the order is packed or out for delivery. Full refund will be given.

2. AFTER DISPATCH
Once the delivery partner is out for delivery, the order cannot be cancelled. After delivery, you can return the product under our 7 Days Return Policy.

3. CANCEL BY PURPY.
PURPY. may cancel an order in case of:
- Product out of stock
- Delivery address outside Kakinada
- Suspected fake order or fraud
- Incorrect pricing or technical issue
In all such cases, you will get a full refund and an SMS notification.

4. REFUND AFTER CANCELLATION
Refund will be credited within 3 to 5 working days to your original payment method, or instantly to PURPY Wallet if you paid by Wallet.

5. HOW TO CANCEL
Go to My Orders > Select Order > Cancel Order.

Last Updated: January 2026.`
    },
    contact: {
      title: "📞 Contact Us",
      text: `PURPY. - Kakinada's Fastest Delivery App

📍 Address:
Main Road, Kakinada,
Andhra Pradesh - 533001, India

📞 Phone / WhatsApp:
99666 12345
9 AM to 9 PM - All Days

📧 Email:
help@purpy.in

🤖 AI Help Desk:
Available 24x7 inside the app.
Ask anything - Order, Return, Refund, Offer, Delivery.

🕐 Working Hours:
Customer Support: 9 AM - 9 PM
Delivery: 8 AM - 10 PM

We will reply within 2 hours during working hours.`
    },
  };

  return (
    <footer style={{ background: "#f0fdf4", borderTop: "2px solid #bbf7d0", marginTop: 20 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#166534" }}>
        <span>🚚 Free Delivery ₹499+</span><span>↩️ 7 Days Return</span><span>🔒 Secure</span><span>📍 Kakinada • 533001</span>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4px 12px 16px" }}>
        <div style={{ padding: "10px 8px", textAlign: "center" }}>
          <b onClick={() => go("home")} style={{ cursor: "pointer", fontSize: 20, fontWeight: 900, color: "#14532d", background: "white", padding: "5px 14px", borderRadius: 20, border: "2px solid #16a34a", display: "inline-block" }}>PURPY.</b>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#666" }}>Kakinada's Fastest Delivery • Grocery • Clothes • Electronics • 10 Mins Delivery</p>
          <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 700 }}>📍 Kakinada • 533001 • 📞 99666 12345 • 9AM - 9PM</p>
        </div>
        <div>
          <p style={headStyle} onClick={() => toggle("shop")}><span>🛍️ SHOP BY PURPY.</span><span style={arrowStyle(open === "shop")}>▼</span></p>
          {open === "shop" && (
            <div style={{ padding: "6px 8px 10px" }}>
              <span style={linkStyle} onClick={() => goCat("grocery")}>🥦 Grocery</span>
              <span style={linkStyle} onClick={() => goCat("clothes")}>👕 Clothes</span>
              <span style={linkStyle} onClick={() => goCat("electronics")}>📱 Electronics</span>
              <span style={linkStyle} onClick={() => goCat("beauty")}>💄 Beauty</span>
              <span style={linkStyle} onClick={() => goCat("fashion")}>👜 Fashion</span>
              <span style={linkStyle} onClick={() => goCat("sports")}>⚽ Sports</span>
              <span style={linkStyle} onClick={() => goCat("furniture")}>🛋️ Furniture</span>
            </div>
          )}
        </div>
        <div>
          <p style={headStyle} onClick={() => toggle("care")}><span>💬 CUSTOMER CARE</span><span style={arrowStyle(open === "care")}>▼</span></p>
          {open === "care" && (
            <div style={{ padding: "6px 8px 10px" }}>
              <span style={linkStyle} onClick={onOpenAI}>🤖 AI Help Desk - Ask Anything</span>
              <span style={linkStyle} onClick={() => go("orders")}>📦 My Orders - Track Order</span>
              <span style={linkStyle} onClick={() => go("cart")}>🛒 My Cart</span>
              <span style={linkStyle} onClick={() => go("wishlist")}>❤️ My Wishlist</span>
              <span style={linkStyle} onClick={() => go("home")}>🏠 Home - Main Page</span>
              <span style={linkStyle} onClick={() => go("search")}>🔍 Search Products</span>
            </div>
          )}
        </div>
        <div>
          <p style={headStyle} onClick={() => toggle("account")}><span>👤 ACCOUNT</span><span style={arrowStyle(open === "account")}>▼</span></p>
          {open === "account" && (
            <div style={{ padding: "6px 8px 10px" }}>
              <span style={linkStyle} onClick={() => go("account")}>👤 My Account - My Details - Name, Phone, Address</span>
              <span style={linkStyle} onClick={() => go("orders")}>📦 Orders & Returns</span>
              <span style={linkStyle} onClick={() => go("settings")}>⚙️ Settings - Language</span>
              <span style={linkStyle} onClick={() => go("wallet")}>💰 Wallet - ₹1250 Coins - View Balance</span>
              <span style={linkStyle} onClick={() => go("home")}>🎁 Offers - PURPY100 - ₹100 OFF</span>
              <p style={{ margin: "10px 0 0", fontSize: 11, color: "#666", background: "white", padding: "8px 10px", borderRadius: 10, border: "1px solid #bbf7d0" }}><b style={{ color: "#16a34a" }}>PURPY100</b> - First Order<br />₹100 OFF - Above ₹499</p>
            </div>
          )}
        </div>
        <div>
          <p style={headStyle} onClick={() => toggle("terms")}><span>📜 TERMS & POLICY</span><span style={arrowStyle(open === "terms")}>▼</span></p>
          {open === "terms" && (
            <div style={{ padding: "6px 8px 10px" }}>
              <span style={linkStyle} onClick={() => setPolicy("terms")}>📜 Terms & Conditions</span>
              <span style={linkStyle} onClick={() => setPolicy("privacy")}>🔒 Privacy Policy</span>
              <span style={linkStyle} onClick={() => setPolicy("refund")}>↩️ Refund & Return Policy - 7 Days</span>
              <span style={linkStyle} onClick={() => setPolicy("shipping")}>🚚 Shipping & Delivery Policy - 10 Mins</span>
              <span style={linkStyle} onClick={() => setPolicy("cancel")}>❌ Cancellation Policy</span>
              <span style={linkStyle} onClick={() => setPolicy("contact")}>📞 Contact Us - Kakinada</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #bbf7d0", padding: "12px", textAlign: "center", fontSize: 12, color: "#666" }}>
        © 2026 <b style={{ color: "#16a34a" }}>PURPY.</b> • Kakinada • Made with ❤️ in Kakinada
        <div style={{ marginTop: 6, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <span onClick={() => setPolicy("terms")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700 }}>Terms</span>
          <span onClick={() => setPolicy("privacy")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700 }}>Privacy</span>
          <span onClick={() => setPolicy("refund")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700 }}>Refund</span>
          <span onClick={() => setPolicy("shipping")} style={{ cursor: "pointer", color: "#16a34a", fontWeight: 700 }}>Shipping</span>
        </div>
      </div>
      {policy && (
        <div onClick={() => setPolicy(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 16, maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ fontSize: 16 }}>{policies[policy].title}</b>
              <button onClick={() => setPolicy(null)} style={{ background: "#f3f4f6", border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#444", whiteSpace: "pre-line", marginTop: 12 }}>{policies[policy].text}</p>
            <button onClick={() => setPolicy(null)} style={{ marginTop: 12, width: "100%", background: "#16a34a", color: "white", border: "none", padding: "10px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>Got It - Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}