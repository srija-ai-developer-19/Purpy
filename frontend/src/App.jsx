import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import AIHelpDesk from "./components/AIHelpDesk.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import HomeSearchBar from "./components/HomeSearchBar.jsx";
import Settings from "./pages/Settings.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import Wallet from "./pages/Wallet.jsx";
import Account from "./pages/Account.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

export function purpyGo(url) {
  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.dispatchEvent(new Event("purpy-navigate"));
  window.scrollTo(0, 0);
}

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);
  const [, setTick] = useState(0);
  const getView = () => new URLSearchParams(window.location.search).get("view") || "home";
  const view = getView();
  const urlKey = window.location.search;
  const [showSplash, setShowSplash] = useState(() => {
    try { return sessionStorage.getItem("purpySplashShown") !== "yes"; } catch (e) { return true; }
  });
  const hideSplash = () => {
    try { sessionStorage.setItem("purpySplashShown", "yes"); } catch (e) {}
    setShowSplash(false);
  };
  useEffect(() => {
    const onNav = () => setTick((t) => t + 1);
    window.addEventListener("popstate", onNav);
    window.addEventListener("purpy-navigate", onNav);
    return () => { window.removeEventListener("popstate", onNav); window.removeEventListener("purpy-navigate", onNav); };
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [urlKey]);
  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onDone={hideSplash} />}
      <div style={{ minHeight: "100vh", background: "#fafafb", display: "flex", flexDirection: "column" }}>
        <Header onOpenAI={() => setAiOpen(true)} />
        {view !== "search" && <HomeSearchBar />}
        <main style={{ flex: 1 }} key={urlKey}>
          {view === "home" && <Home />}
          {view === "category" && <CategoryPage />}
          {view === "items" && <ItemsPage />}
          {view === "cart" && <Cart />}
          {view === "wishlist" && <Wishlist />}
          {view === "search" && <SearchPage />}
          {view === "product" && <ProductDetail />}
          {view === "checkout" && <Checkout />}
          {view === "orders" && <MyOrders />}
          {view === "settings" && <Settings />}
          {view === "wallet" && <Wallet />}
          {view === "account" && <Account />}
          {!["home", "category", "items", "cart", "wishlist", "search", "product", "checkout", "orders", "settings", "wallet", "account"].includes(view) && <Home />}
        </main>
        <Footer onOpenAI={() => setAiOpen(true)} />
        <AIHelpDesk open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </LanguageProvider>
  );
}