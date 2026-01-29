// المستخدم يعرف من خلال ID, الاسم, البريد الإلكتروني, الموقع, كلمة السر
export default class User {
  constructor({ id, username, email, address }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.address = address;
  }
}