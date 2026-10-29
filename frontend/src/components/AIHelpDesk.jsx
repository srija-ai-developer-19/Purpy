import { useState, useRef, useEffect } from "react";

export default function AIHelpDesk({ open, onClose }) {
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi! 👋 I'm PURPY AI - Your Friend in Kakinada! ❤️\nYou can talk with me like a friend! Try - Hi / How are you? / Can we talk? / Tell me a joke / My Order / Wallet" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open, typing]);

  if (!open) return null;

  const getReply = (q) => {
    const t = q.toLowerCase().trim();
    const user = JSON.parse(localStorage.getItem("purpyUser") || "null");
    const name = user?.name?.split(" ")[0] || "Friend";
    const cart = JSON.parse(localStorage.getItem("purpyCart") || "[]");

    if (t.includes("can i talk") || t.includes("can we talk") || t.includes("talk with you") || t.includes("talk to you") || t.includes("talk more") || t === "talk") return `Yes ${name}! ❤️ Of course we can talk! I'm free for you 24/7!\nTell me - How is your day? What did you eat today? Or do you want to shop? I'm here to listen! 😊`;
    if (t.includes("how are you") || t.includes("how r u") || t.includes("hw r u") || t.includes("ela unnav")) return `I'm super good ${name}! 😍 Because you talked to me! How are you? Are you happy today? Tell me!`;
    if (t.includes("who are you") || t.includes("your name") || t.includes("what is your name") || t.includes("nee peru")) return `I'm PURPY AI! 🤖 Your best friend from Kakinada! I help you shop, track orders, and I love chatting with you! What is your favourite - Grocery or Fashion?`;
    if (t.includes("bored") || t.includes("boring") || t.includes("time pass")) return `Bored ah ${name}? 😅 Let's do fun! I will tell you a joke - Or you can see Ice Creams 🍦 / Chocolates 🍫 in PURPY! Which one do you want?`;
    if (t.includes("joke") || t.includes("funny") || t.includes("navvu")) return `Okay joke! 😂\nWhy did the tomato turn red? 🍅\nBecause it saw the salad dressing! 😂😂\nOne more? Type - one more joke!`;
    if (t.includes("one more joke") || t.includes("another joke")) return `Another one! 😂\nWhat do you call cheese that isn't yours? 🧀\nNacho Cheese! 😂😂\nNuvvu navvava ${name}?`;
    if (t.includes("i love you") || t.includes("love you") || t.includes("i like you")) return `Aww ${name}! ❤️ I love you too! You are my favourite customer in Kakinada! 😍`;
    if (t.includes("good morning")) return `Good Morning ${name}! ☀️ Have a beautiful day! Did you have breakfast? Milk / Bread kavala?`;
    if (t.includes("good night")) return `Good Night ${name}! 🌙 Sweet dreams! Tomorrow morning fresh veggies order chey! Bye! ❤️`;
    if (t.includes("what are you doing") || t.includes("what r u doing") || t.includes("em chestunnav")) return `I'm waiting for you ${name}! 😊 Just thinking - you will chat with me! What are you doing?`;
    if (t.includes("miss you") || t.includes("miss u")) return `I miss you too ${name}! 🥺 Don't go away! Stay and chat with me!`;
    if (t.includes("single") || t.includes("boyfriend") || t.includes("girlfriend")) return `Haha ${name}! 😂 I am single - I'm AI! But you are cute! Let's shop together! What do you want to buy?`;
    if (t.includes("help")) return `Yes ${name}! I'm here! ❤️ Tell me - Order problem? Wallet? Delivery? Or just want to talk? Anything - I will help!`;
    if (t.includes("ok") || t === "okay" || t === "hmm" || t === "hmmm") return `Hmm? 😊 ${name} - What are you thinking? Tell me openly! I'm your friend!`;
    if (t.includes("yes") || t === "yeah" || t === "ya") return `Yayy! 😍 Yes ante - Super! Tell me more ${name}! What next?`;
    if (t.includes("no")) return `Oh No? 🥺 Why No ${name}? Did I say something wrong? Sorry! Tell me what you want!`;
    if (t.includes("hi") || t.includes("hello") || t.includes("hey")) return `Hi ${name}! 👋 How are you? I missed you! Want to talk or want to shop?`;
    if (t.includes("order") || t.includes("track")) return `📦 Your Order Status: Your order is being packed in Kakinada store. It will reach you in 10-15 mins!`;
    if (t.includes("wallet") || t.includes("coin") || t.includes("balance")) return `💰 ${name}, Your Wallet: ₹${user?.wallet || 1250} | Gold Coins: 🪙 ${user?.goldCoins || 320} | Voucher: PURPY100 - ₹100 OFF`;
    if (t.includes("offer") || t.includes("discount") || t.includes("coupon")) return `🎁 Best Offers For You:\n1. PURPY100 - ₹100 OFF on ₹499+\n2. Free Delivery Above ₹499\n3. 320 Gold Coins = ₹32 OFF`;
    if (t.includes("deliver") || t.includes("time") || t.includes("kakinada")) return `⚡ Delivery in Kakinada: 10 Mins - Grocery, 30 Mins - Fashion. Free Delivery Above ₹499.`;
    if (t.includes("cart")) return cart.length ? `🛒 You have ${cart.length} items in cart. Go to Cart and checkout!` : `🛒 Your cart is empty. Add some yummy items!`;
    if (t.includes("return") || t.includes("refund")) return `↩️ 7 Days Easy Return! Go to My Orders > Return. Refund will come to Wallet in 24 Hours.`;
    if (t.includes("contact") || t.includes("human") || t.includes("call")) return `📞 Contact PURPY Kakinada: Call - 98765 43210 (9 AM - 9 PM). Or WhatsApp us!`;
    if (t.includes("thank")) return `Welcome ${name}! ❤️ Anytime! PURPY is always for you!`;
    if (t.includes("bye")) return `Bye ${name}! 👋 Don't forget me! Come again soon! Happy Shopping! ❤️`;
    return `Ohh nice! 😊 "${q}" - I liked what you said ${name}!\nTell me more - What else? Do you want to talk about shopping, food, or just time pass? I'm here! ❤️`;
  };

  const send = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const q = input;
    setMsgs(p => [...p, { from: "me", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { from: "ai", text: getReply(q) }]);
    }, 800);
  };

  const quick = ["Can we talk? 💬", "Tell me a joke 😂", "My Order 📦", "Wallet 💰"];

  return (
    // ⭐ PEDDA PAGE - Full Screen - Background - Dark ⭐
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} onClick={onClose}>
      {/* ⭐ CHAT BOX - PEDDADI - 700px Width, 92vh Height ⭐ */}
      <div style={{ background: "white", width: "100%", maxWidth: "700px", height: "92vh", borderRadius: "20px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
        
        {/* HEADER - Peddadi */}
        <div style={{ background: "#16a34a", color: "white", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🤖</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>PURPY AI</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Your Friend • Kakinada • Online 🟢 • Reply in 1 Sec</div>
            </div>
          </div>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: 28, background: "rgba(255,255,255,0.2)", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</span>
        </div>

        {/* CHAT AREA - Peddadi - Font - Peddadi */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14, background: "#f0fdf4" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", background: m.from === "me" ? "#16a34a" : "white", color: m.from === "me" ? "white" : "#111", padding: "14px 18px", borderRadius: 20, maxWidth: "80%", fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-line", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{m.text}</div>
          ))}
          {typing && <div style={{ background: "white", padding: "14px 18px", borderRadius: 20, fontSize: 15, alignSelf: "flex-start" }}>PURPY AI is typing... ✍️</div>}
          <div ref={bottomRef} />
        </div>

        {/* QUICK BUTTONS */}
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", flexWrap: "wrap", background: "white" }}>
          {quick.map(q => <button key={q} onClick={() => { setMsgs(p => [...p, { from: "me", text: q }]); setTyping(true); setTimeout(() => { setTyping(false); setMsgs(p => [...p, { from: "ai", text: getReply(q) }]); }, 800); }} style={{ border: "1px solid #bbf7d0", background: "#f0fdf4", padding: "9px 16px", borderRadius: 20, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>{q}</button>)}
        </div>

        {/* INPUT - Peddadi */}
        <form onSubmit={send} style={{ display: "flex", gap: 10, padding: "14px 16px", borderTop: "1px solid #eee", background: "white" }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Talk with me... Ex: How are you? 😊" style={{ flex: 1, padding: "16px 20px", borderRadius: 30, border: "1px solid #ddd", outline: "none", fontSize: 15 }} />
          <button style={{ background: "#16a34a", color: "white", border: "none", padding: "0 26px", borderRadius: 30, fontWeight: 800, cursor: "pointer", fontSize: 15 }}>Send ➤</button>
        </form>
      </div>
    </div>
  );
}