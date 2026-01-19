import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// مسؤول عن تخزين عناصر السلة, حفظها في localStorage, و توفير دوال التحكم بالسلة
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

// تحميل السلة عند تشغيل الموقع
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) {
        setCartItems(savedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from storage", error);
    }
  }, []);

// حفظ السلة عند أي تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

// إضافة منتج إلى السلة
  const addToCart = (flower) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.flower.id === flower.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.flower.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { flower, quantity: 1 }];
    });
  };

// حذف منتج بالكامل
  const removeFromCart = (flowerId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.flower.id !== flowerId)
    );
  };

// تعديل كمية المنتج
  const updateQuantity = (flowerId, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.flower.id === flowerId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

// تفريغ السلة بالكامل
  const clearCart = () => {
    setCartItems([]);
  };

// حساب السعر الإجمالي
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.flower.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook جاهز للاستخدام داخل الصفحات
export function useCart() {
  return useContext(CartContext);
}