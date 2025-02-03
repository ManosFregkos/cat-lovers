import {CatCardImage} from "../entities/CatCardImage";
import {CatRepository} from "../repositories/CatRepository";

export class GetTenCatImages {
  constructor(private readonly repository: CatRepository) {}

  async execute(): Promise<CatCardImage[]> {
    return await this.repository.getTenCatImages();
  }
}