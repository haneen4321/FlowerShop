import CartRepository from "../../domain/repositories/CartRepository";
import { getCartFromStorage, saveCartToStorage } from "../storage/localStorageService";

// يرث من ملف CartRepository
export default class CartRepositoryImpl extends CartRepository {

// جلب محتويات السلة من التخزين وارجاعها كـ array
  getItems() {
    return getCartFromStorage();
  }

// اظهار السلة الحالية
  addItem(item) {
    const cart = getCartFromStorage();

//  إضافة الزهرة إلى السلة
    const existingItem = cart.find(
      cartItem => cartItem.flower.id === item.flower.id
    );

// الزهرة موجودة = زيادة الكمية فقط 
    if (existingItem) {
      existingItem.quantity += item.quantity;

// الزهرة غير موجودة = زيادة إضافتها إلى السلة 
    } else {
      cart.push(item);
    }

// حفظ محتويات السلة
    saveCartToStorage(cart);
  }

//  حذف الزهرة إلى السلة
  removeItem(flowerId) {
    const cart = getCartFromStorage();
    const updatedCart = cart.filter(
      item => item.flower.id !== flowerId
    );

// حفظ محتويات السلة
    saveCartToStorage(updatedCart);
  }
}