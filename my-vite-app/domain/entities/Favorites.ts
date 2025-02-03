interface ImageFavorites {
  id: string;
  url: string;
}

export interface FavouritesType {
  id: number;
  image_id: string | number;
  sub_id: string;
  created_at: string;
  value: number;
  country_code: string;
  image: ImageFavorites
}

export interface FavoriteCreation {
  message: string;
  id: number;
  image_id: string;
  sub_id?: string;
  value: number;
  country_code?: string;
}

