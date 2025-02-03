import {CatRepository} from "../repositories/CatRepository";
import {FavouritesType} from "../entities/Favorites.ts";

export class GetAllFavorites {
  constructor(private readonly repository: CatRepository) {}

  async execute(userId: string): Promise<FavouritesType[]> {
    return await this.repository.getUserFavorites(userId);
  }
}