import {CatRepository} from "../repositories/CatRepository";
import {FavoriteCreation} from "../entities/Favorites.ts";

export class AddToFavorites {
  constructor(private readonly repository: CatRepository) {}

  async execute(userId: string, id: string): Promise<FavoriteCreation> {
    return await this.repository.addToFavorites(userId, id);
  }
}