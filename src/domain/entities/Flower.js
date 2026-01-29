// الزهرة تعرف من خلال ID, الاسم, السعر, الصورة
export default class Flower {
  constructor({ id, name, price, image }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}