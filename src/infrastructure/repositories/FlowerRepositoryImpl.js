import FlowerRepository from "../../domain/repositories/FlowerRepository";
import { getSalesStats } from "../storage/salesStorage";
import Flower from "../../domain/entities/Flower";
import { flowersData } from "../data/flowersData";

export default class FlowerRepositoryImpl extends FlowerRepository {

  getAll() {
    return flowersData.map(flower => new Flower(flower));
  }

  getBestSellers(limit = 2) {
    const salesStats = getSalesStats();

    return flowersData
      .map(flower => ({
        ...flower,
        salesCount: salesStats[flower.id] || 0
      }))
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, limit)
      .map(flower => new Flower(flower));
  }
}
