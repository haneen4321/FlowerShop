// المستخدم في النظام
export default class User {

  // يجب أن يكون لكل مستخدم: رقم ID, اسم مستخدم, بريد الكتروني, وعنوان
  constructor({ id, username, email, address }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.address = address;
  }
}