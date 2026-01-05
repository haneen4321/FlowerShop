export default class GetAllFlowers {
  constructor(flowerRepository) {
    this.flowerRepository = flowerRepository;
  }

  execute() {
    return this.flowerRepository.getAll();
  }
}