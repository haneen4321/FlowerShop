// تحديد نوع بيانات المستحدم بدون الواجهة
export default class UserRepository {

// يحدد البيانات التي يحتاجها عند تسجيل الدخول
  login(email, password) {
    throw new Error("Method not implemented");
  }

// يحدد البيانات التي يحتاجها عند التسجيل
  register(userData) {
    throw new Error("Method not implemented");
  }
}