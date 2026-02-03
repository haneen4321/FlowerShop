export default class AddToCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  execute(cartItem) {
    this.cartRepository.addItem(cartItem);
  }
}