import {FavouritesType} from "../../../domain/entities/Favorites.ts";
import {CatRepositoryAPI} from "../../../infrastructure/CatRepositoryAPI.ts";
import {Backdrop, CircularProgress, Stack} from "@mui/material";
import FavoriteCard from "../Cards/FavoriteCard.tsx";
import {RemoveFromFavorites} from "../../../domain/useCases/RemoveFromFavorites.ts";
import {Dispatch, SetStateAction, useState} from "react";

type FavoritesListProps = {
  favorites: FavouritesType[],
  loading: boolean,
  repository: CatRepositoryAPI
  setFavorites: Dispatch<SetStateAction<FavouritesType[]>>
}

const FavoritesList = ({favorites, setFavorites, loading, repository}: FavoritesListProps) => {
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(false);

  const removeFavorite = async (id: number) => {
    try {
      setLoadingFavorites(true)
      const removeFromFavorites = new RemoveFromFavorites(repository)
      await removeFromFavorites.execute(id)
      setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingFavorites(false)
    }
  }

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center">
      {favorites.map((favorite) => (
        <Stack key={favorite.id}><FavoriteCard onToggleFavorite={removeFavorite} favorite={favorite}/></Stack>
      ))}
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading || loadingFavorites}>
        <CircularProgress color="primary"/>
      </Backdrop>
    </Stack>
  )
}
export default FavoritesList