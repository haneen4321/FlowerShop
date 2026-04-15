import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import Button from "../components/Button";
import "../styles/global.css";
import "../styles/cart.css";
export default function Cart() {
  const { cartItems = [], removeFromCart, updateQuantity, checkout } = useCart();
  const { user } = useAuth();
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const t = {
    ...translations.global,
    ...translations.buttons,
    ...translations.cart,
    flowers: translations.flowers,
  };
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  const validItems = cartItems.filter(
    (item) => item && item.flower && typeof item.flower.price === "number"
  );
  const total = validItems.reduce(
    (sum, item) => sum + item.flower.price * item.quantity,
    0
  );
  return (
    <div className="page">

      <div className="cart-summary box">
        <div className="summary-text">
          <h2>{t.total}</h2>
          <span>{total}$</span>
        </div>
        <Button
          className="checkout-btn btn-primary"
          variant="primary"
          onClick={checkout}
          disabled={validItems.length === 0}>{t.checkout}</Button>
      </div>
      {validItems.length === 0 && <h2>{t.empty}</h2>}
      {validItems.map((item) => {
        const flower = item.flower;
        return (
          <div key={flower?.id} className="cart-item box">
            <img src={flower?.image} alt={flower?.nameKey} />
            <div className="cart-info">
              <h3>{t.flowers?.[flower?.nameKey]}</h3>
              <div className="quantity-control box">
                <button onClick={() => updateQuantity(flower?.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(flower?.id, 1)}>+</button>
              </div>
            </div>
            <div className="cart-total">
              <span>{(flower?.price ?? 0) * item.quantity}$</span>
              <button
                className="btn-text btn-primary"
                onClick={() => removeFromCart(flower?.id)}>🗑</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}