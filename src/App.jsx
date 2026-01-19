import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./presentation/context/CartContext";

import Header from "./presentation/components/layout/Header";
import Footer from "./presentation/components/layout/Footer";

import Home from "./presentation/pages/Home";
import Shop from "./presentation/pages/Shop";
import About from "./presentation/pages/About";
import Login from "./presentation/pages/Login";
import Register from "./presentation/pages/Register";
import Cart from "./presentation/pages/Cart";
import Profile from "./presentation/pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

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

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;