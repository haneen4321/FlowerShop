import CartRepository from "../../domain/repositories/CartRepository";
import { getCartFromStorage, saveCartToStorage } from "../storage/localStorageService";
export default class CartRepositoryImpl extends CartRepository {
  addItem(item) {
    const cart = getCartFromStorage();
    const existingItem = cart.find(cartItem => cartItem.flower.id === item.flower.id);

    if (existingItem){
      existingItem.quantity += item.quantity;
    }

    else {
      cart.push(item);
    }
    
    saveCartToStorage(cart);
  }

  removeItem(flowerId) {
    const cart = getCartFromStorage();
    const updatedCart = cart.filter(item => item.flower.id !== flowerId);
    saveCartToStorage(updatedCart);
  }
}