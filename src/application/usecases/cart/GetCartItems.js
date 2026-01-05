export default class GetCartItems {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  execute() {
    return this.cartRepository.getItems();
  }
}