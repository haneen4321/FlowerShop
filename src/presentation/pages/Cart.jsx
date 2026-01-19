import "../styles/global.css";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { translations } = useLanguage();
  const t = translations.cart;

  const total = cartItems.reduce(
    (sum, item) => sum + item.flower.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2>{t.empty}</h2>;
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.flower.id} className="cart-item">
            <img src={item.flower.image} alt={item.flower.name} />

            <div className="cart-info">
              <h3>{item.flower.name}</h3>
              <p>
                {t.unitPrice} {item.flower.price}$
              </p>

              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.flower.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.flower.id, 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="cart-total">
              <span>
                {t.total} {item.flower.price * item.quantity}$
              </span>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.flower.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>
          {t.subtotal}: {total}$
        </h3>
        <button className="checkout-btn">{t.checkout}</button>
      </div>
    </div>
  );
}
