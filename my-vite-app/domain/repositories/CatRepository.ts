import {CatCardImage, CatCardImageById} from "../entities/CatCardImage";
import {FavoriteCreation, FavouritesType} from "../entities/Favorites.ts";
import {Breed} from "../entities/Breeds.ts";

export interface CatRepository {
  getTenCatImages(): Promise<CatCardImage[]>;
  getCatById(catId: string): Promise<CatCardImageById>;
  getUserFavorites(userId: string): Promise<FavouritesType[]>;
  addToFavorites(userId: string, id: string): Promise<FavoriteCreation>;
  deleteFromFavorites(favId: number): Promise<void>;
  getAllBreeds(): Promise<Breed[]>;
  getBreedById(id: string): Promise<CatCardImage[]>;
}