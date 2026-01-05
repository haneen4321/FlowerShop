export default class Login {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(email, password) {
    return this.userRepository.login(email, password);
  }
}