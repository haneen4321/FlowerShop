export default class User {
  constructor(id, email, username, password, firstName = "", lastName = "", phone = "") {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}