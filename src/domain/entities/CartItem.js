// تعريف كل عنصر موجود في السلة على حدة
export default class CartItem {

// يستقبل Objects التالية: الزهرة, والكمية
  constructor({ flower, quantity }) {
    this.flower = flower;
    this.quantity = quantity;
  }
}