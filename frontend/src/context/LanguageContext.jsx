import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home", cart: "Cart", orders: "Orders", wishlist: "Wishlist", settings: "Settings",
    login: "Login", search: "Search products...", shopNow: "Shop Now", addToCart: "Add to Cart",
    checkout: "Checkout", placeOrder: "Place Order", deliveryAddress: "Delivery Address",
    payment: "Payment", total: "Total", myOrders: "My Orders", orderPlaced: "Order Placed Successfully!",
    continueShopping: "Continue Shopping", noOrders: "No Orders Yet!", language: "Language",
    darkMode: "Dark Mode", notifications: "Notifications", save: "Save Settings",
    delivery: "Delivery", free: "FREE", addNewAddress: "Add New Address", saved: "Saved",
  },
  te: {
    home: "హోమ్", cart: "కార్ట్", orders: "ఆర్డర్లు", wishlist: "విష్ లిస్ట్", settings: "సెట్టింగ్స్",
    login: "లాగిన్", search: "ప్రొడక్ట్స్ వెతకండి...", shopNow: "ఇప్పుడే షాప్ చేయండి", addToCart: "కార్ట్ లో వేయండి",
    checkout: "చెక్ అవుట్", placeOrder: "ఆర్డర్ చేయండి", deliveryAddress: "డెలివరీ అడ్రస్",
    payment: "పేమెంట్", total: "మొత్తం", myOrders: "నా ఆర్డర్లు", orderPlaced: "ఆర్డర్ విజయవంతం!",
    continueShopping: "షాపింగ్ కొనసాగించండి", noOrders: "ఇంకా ఆర్డర్లు లేవు!", language: "భాష",
    darkMode: "డార్క్ మోడ్", notifications: "నోటిఫికేషన్లు", save: "సేవ్ చేయండి",
    delivery: "డెలివరీ", free: "ఉచితం", addNewAddress: "కొత్త అడ్రస్ చేర్చండి", saved: "సేవ్ అయింది",
  },
  hi: {
    home: "होम", cart: "कार्ट", orders: "ऑर्डर", wishlist: "विशलिस्ट", settings: "सेटिंग्स",
    login: "लॉगिन", search: "प्रोडक्ट खोजें...", shopNow: "अभी शॉप करें", addToCart: "कार्ट में डालें",
    checkout: "चेकआउट", placeOrder: "ऑर्डर करें", deliveryAddress: "डिलीवरी एड्रेस",
    payment: "पेमेंट", total: "कुल", myOrders: "मेरे ऑर्डर", orderPlaced: "ऑर्डर सफल!",
    continueShopping: "शॉपिंग जारी रखें", noOrders: "अभी कोई ऑर्डर नहीं!", language: "भाषा",
    darkMode: "डार्क मोड", notifications: "नोटिफिकेशन", save: "सेव करें",
    delivery: "डिलीवरी", free: "फ्री", addNewAddress: "नया एड्रेस जोड़ें", saved: "सेव हो गया",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(localStorage.getItem("purpyLang") || "en");
  const [dark, setDark] = useState(localStorage.getItem("purpyDark") === "1");
  const [notify, setNotify] = useState(localStorage.getItem("purpyNotify") !== "0");

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("purpyLang", newLang);
    document.documentElement.lang = newLang;
    // Force all components to re-render with new language
    window.dispatchEvent(new Event("purpyLangChange"));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("purpyDark", dark ? "1" : "0");
    document.body.style.background = dark ? "#111" : "#fafafb";
    document.body.style.color = dark ? "#fff" : "#111";
  }, [dark]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dark, setDark, notify, setNotify }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);