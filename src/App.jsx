import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./presentation/components/layout/Header";
import Footer from "./presentation/components/layout/Footer";
import LanguageOnlyHeader from "./presentation/components/layout/LanguageOnlyHeader";

import Home from "./presentation/pages/Home";
import Shop from "./presentation/pages/Shop";
import About from "./presentation/pages/About";
import Login from "./presentation/pages/Login";
import Register from "./presentation/pages/Register";
import Cart from "./presentation/pages/Cart";
import Profile from "./presentation/pages/Profile";

/* ===== Layout ===== */
function Layout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {isAuthPage ? <LanguageOnlyHeader /> : <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

/* ===== App ===== */
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
