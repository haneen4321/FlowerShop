export default class GetBestSellers {
  constructor(flowerRepository) {
    this.flowerRepository = flowerRepository;
  }

  execute() {
    return this.flowerRepository.getBestSellers();
  }
}