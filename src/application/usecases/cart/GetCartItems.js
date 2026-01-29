export default class GetCartItems {
// جلب عناصر السلة من CartRepository
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

// إرجاع جميع عناصر السلة الحالية
  execute() {
    return this.cartRepository.getItems();
  }
}