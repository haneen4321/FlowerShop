export default class Register {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(userData) {
    return this.userRepository.register(userData);
  }
}