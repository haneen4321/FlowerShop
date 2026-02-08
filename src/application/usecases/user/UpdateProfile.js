export default class UpdateProfile {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(userId, data) {
    return this.userRepository.update(userId, data);
  }
}
