export default class Login {
// تنفيذ عملية تسجيل الدخول عبر الـUserRepository
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

// يقوم فقط باستدعاء البريد الالكتروني وكلمة السر 
  execute(email, password) {
    return this.userRepository.login(email, password);
  }
}