// يحتوي كيان الزهرة كاملًا, ثم يضيف عليه الكمية
export default class CartItem {
  constructor({ flower, quantity }) {
    this.flower = flower;
    this.quantity = quantity;
  }
}