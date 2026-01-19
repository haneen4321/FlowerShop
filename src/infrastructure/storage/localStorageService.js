// مفتاح ثابت لعدم تكراره في كل مكان
const CART_KEY = "cart";

// استرجاع حالة السلة من التخزين
export const getCartFromStorage = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

// حفظ حالة السلة في التخزين
export const saveCartToStorage = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};