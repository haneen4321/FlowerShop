const CART_KEY = "cart";
export const getCartFromStorage = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};