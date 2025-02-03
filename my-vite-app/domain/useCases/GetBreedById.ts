import {CatRepository} from "../repositories/CatRepository";
import {CatCardImage} from "../entities/CatCardImage.ts";

export class GetBreedById {
  constructor(private readonly repository: CatRepository) {}

  async execute(breedId: string): Promise<CatCardImage[]> {
    return await this.repository.getBreedById(breedId);
  }
}