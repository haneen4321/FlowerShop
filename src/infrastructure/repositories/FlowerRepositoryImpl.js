import FlowerRepository from "../../domain/repositories/FlowerRepository";
import Flower from "../../domain/entities/Flower";
import { flowersData } from "../data/flowersData";

export default class FlowerRepositoryImpl extends FlowerRepository {
  getAll() {
    return flowersData.map(flower => new Flower(flower));
  }

  getBestSellers() {
    return flowersData
      .slice(0, 2)
      .map(flower => new Flower(flower));
  }
}