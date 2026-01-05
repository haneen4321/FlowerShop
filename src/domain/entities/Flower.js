// الزهرة في النظام
export default class Flower {

// يجب أن يكون لكل زهرة: رقم ID, اسم, سعر, وصورة
  constructor({ id, name, price, image }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}