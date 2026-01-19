// تحديد وظائف السلة بدون الواجهة
export default class CartRepository {

  // إرجاع بيانات السلة مع تحديد شكلها
  getItems() {
    throw new Error("Method not implemented");
  }

// إضافة الزهرة إلى السلة
// يستقبل item لأنه يحتاج إلى معرفة الزهرة مع الكمية
  addItem(item) {
    throw new Error("Method not implemented");
  }

// إزالة الزهرة من السلة
// يستقبل flowerId لأنه يحتاج إلى معرفة الزهرة فقط, بغض النظر عن الكمية
  removeItem(flowerId) {
    throw new Error("Method not implemented");
  }
}