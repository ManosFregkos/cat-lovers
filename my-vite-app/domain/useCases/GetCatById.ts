import {CatRepository} from "../repositories/CatRepository";
import {CatCardImageById} from "../entities/CatCardImage.ts";

export class GetCatById {
  constructor(private readonly repository: CatRepository) {}

  async execute(catId: string): Promise<CatCardImageById> {
    return await this.repository.getCatById(catId);
  }
}