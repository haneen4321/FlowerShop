import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/entities/User";

export default class UserRepositoryImpl extends UserRepository {
  login(email, password) {
    return new User({
      id: 1,
      username: "Demo User",
      email,
      address: "Riyadh"
    });
  }

  register(userData) {
    return new User({
      id: Date.now(),
      ...userData
    });
  }
}