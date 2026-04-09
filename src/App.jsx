import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./presentation/components/layout/Header";
import Footer from "./presentation/components/layout/Footer";
import Home from "./presentation/pages/Home";
import Shop from "./presentation/pages/Shop";
import About from "./presentation/pages/About";
import Login from "./presentation/pages/Login";
import Register from "./presentation/pages/Register";
import Cart from "./presentation/pages/Cart";
import Profile from "./presentation/pages/profile/Profile";
import "./presentation/styles/responsive.css";


/* ===== Layout ===== */
function Layout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* Header يظهر فقط إذا لم تكن صفحة مصادقة */}
      {!isAuthPage && <Header />}

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

      {/* Footer يظهر فقط إذا لم تكن صفحة مصادقة */}
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
