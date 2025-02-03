import {API_URL} from "../config";
import {CatCardImage, CatCardImageById} from "../domain/entities/CatCardImage";
import {CatRepository} from "../domain/repositories/CatRepository";
import {deleteData, fetchData, postData} from "../utils/networking";
import {FavoriteCreation, FavouritesType} from "../domain/entities/Favorites.ts";
import {Breed} from "../domain/entities/Breeds.ts";


export class CatRepositoryAPI implements CatRepository {
  async getTenCatImages(): Promise<CatCardImage[]> {
    return await fetchData<CatCardImage[]>(`${API_URL}/v1/images/search?limit=10`);
  }

  async getCatById(catId: string): Promise<CatCardImageById> {
    return await fetchData<CatCardImageById>(`${API_URL}/v1/images/${catId}`);
  }

  async getUserFavorites(userId: string): Promise<FavouritesType[]> {
    return await fetchData<FavouritesType[]>(`${API_URL}/v1/favourites`, {
      params: {
        sub_id: userId
      }
    });
  }

  async addToFavorites(userId: string, id: string): Promise<FavoriteCreation> {
    return await postData<FavoriteCreation>(`${API_URL}/v1/favourites`, {
      sub_id: userId,
      image_id: id
    });
  }

  async deleteFromFavorites(favId:number): Promise<void> {
    return await deleteData<void>(`${API_URL}/v1/favourites/${favId}`);
  }

  async getAllBreeds(): Promise<Breed[]> {
    return await fetchData<Breed[]>(`${API_URL}/v1/breeds`);
  }

  async getBreedById(breedId:string): Promise<CatCardImage[]> {
    return await fetchData<CatCardImage[]>(`${API_URL}/v1/images/search`, {
      params: {
        breed_ids: breedId
      }
    });
  }
}