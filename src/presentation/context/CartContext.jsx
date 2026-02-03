import { createContext, useContext, useEffect, useState } from "react";
import { increaseFlowerSales } from "../../infrastructure/storage/salesStorage";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {

  // المستخدم الحالي
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  // مفتاح السلة حسب المستخدم
  const getCartKey = () => (user ? `cart_${user.id}` : null);

  // تحميل السلة عند تغيير المستخدم
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const key = getCartKey();
    const stored = localStorage.getItem(key);
    setCartItems(stored ? JSON.parse(stored) : []);
  }, [user]);

  // حفظ السلة
  const saveCart = (items) => {
    const key = getCartKey();
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(items));
    setCartItems(items);
  };

  // إضافة إلى السلة + تحديث الأكثر مبيعًا
  const addToCart = (flower) => {
    if (!user) {
      alert("Please login to add items to cart");
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
    } else {
      updatedItems = [...cartItems, { flower, quantity: 1 }];
    }

    saveCart(updatedItems);

    // ✅ هنا المكان الصحيح
    increaseFlowerSales(flower.id);
  };

  // حذف من السلة
  const removeFromCart = (flowerId) => {
    const updatedItems = cartItems.filter(
      (item) => item.flower.id !== flowerId
    );
    saveCart(updatedItems);
  };

  // تعديل الكمية
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}