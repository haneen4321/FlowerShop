import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { increaseFlowerSales } from "../../infrastructure/storage/salesStorage";
const CartContext = createContext();
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const getCartKey = () => (user ? `cart_${user.id}` : null);
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const key = getCartKey();
    const storedCart = localStorage.getItem(key);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  }, [user]);
  const saveCart = (items) => {
    const key = getCartKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(items));
    setCartItems(items);
  };
  const addToCart = (flower) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    const existing = cartItems.find(
      (item) => item.flower.id === flower.id
    );
    let updatedItems;
    if (existing) {
      updatedItems = cartItems.map((item) =>
        item.flower.id === flower.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    else {
      updatedItems = [...cartItems, { flower, quantity: 1 }];
    }
    saveCart(updatedItems);
  };
  const removeFromCart = (flowerId) => {
    const updatedItems = cartItems.filter(
      (item) => item.flower.id !== flowerId
    );
    saveCart(updatedItems);
  };
  const updateQuantity = (flowerId, delta) => {
    const updatedItems = cartItems
      .map((item) =>
        item.flower.id === flowerId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updatedItems);
  };
  const checkout = () => {
    if (cartItems.length === 0) return;
    cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        increaseFlowerSales(item.flower.id);
      }
    });
    saveCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
      }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}