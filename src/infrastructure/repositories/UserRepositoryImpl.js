import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/entities/User";

export default class UserRepositoryImpl extends UserRepository {

  login(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    return new User(foundUser);
  }

  register(userData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(),
      firstName: "",
      lastName: "",
      phone: "",
      ...userData,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return new User(newUser);
  }

  update(userId, data) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, ...data } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedUser = updatedUsers.find((u) => u.id === userId);

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return new User(updatedUser);
  }
}