export default class Register {
// تنفيذ عملية تسجيل الدخول عبر الـUserRepository
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

// يقوم باستدعاء جميع عناصر المستخدم 
  execute(userData) {
    return this.userRepository.register(userData);
  }
}