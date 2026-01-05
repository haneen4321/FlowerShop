export default class RemoveFromCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  execute(flowerId) {
    this.cartRepository.removeItem(flowerId);
  }
}