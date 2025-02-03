import {CatRepository} from "../repositories/CatRepository";

export class RemoveFromFavorites {
  constructor(private readonly repository: CatRepository) {}

  async execute(favId: number): Promise<void> {
    return await this.repository.deleteFromFavorites(favId);
  }
}