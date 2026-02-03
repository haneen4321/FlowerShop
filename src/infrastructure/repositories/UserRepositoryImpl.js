import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/entities/User";
export default class UserRepositoryImpl extends UserRepository {
  login(username, password) {
    return new User({id, username, email address, password});
  }

  register(userData) {
    return new User({id: Date.now(), ...userData});
  }
}