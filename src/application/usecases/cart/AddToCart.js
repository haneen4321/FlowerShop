export default class AddToCart {

// جلب عناصر السلة من CartRepository
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  execute(cartItem) {
    this.cartRepository.addItem(cartItem);
  }
}