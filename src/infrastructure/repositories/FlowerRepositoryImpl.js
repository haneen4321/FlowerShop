import FlowerRepository from "../../domain/repositories/FlowerRepository";
import Flower from "../../domain/entities/Flower";
import { flowersData } from "../data/flowersData";

// يرث من ملف FlowerRepository
export default class FlowerRepositoryImpl extends FlowerRepository {

// جلب كل بيانات الأزهار الموجودة
  getAll() {
    return flowersData.map(flower => new Flower(flower));
  }

// جلب بيانات الأزهار الأكثر مبيعًا
  getBestSellers() {
    return flowersData
      .slice(0, 2)
      .map(flower => new Flower(flower));
  }
}