import {Backdrop, CircularProgress, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {FavouritesType} from "../domain/entities/Favorites.ts";
import {GetAllFavorites} from "../domain/useCases/GetAllFavorites.ts";
import {STATIC_SUB_ID} from "../config.ts";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";
import FavoritesList from "../src/components/Favorites/FavoritesList.tsx";

type HomePageProps = {
  repository: CatRepositoryAPI,
}

const Favorites = ({repository} : HomePageProps) => {

  const [favorites, setFavorites] = useState<FavouritesType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const getAllFavorites = new GetAllFavorites(repository)
        setFavorites(await getAllFavorites.execute(STATIC_SUB_ID))
      }catch (err){
        console.log(err)
      }finally {
        setLoading(false)
      }
    })()
  }, [repository])

  return (
    <Container maxWidth={'xl'}>
      <Backdrop sx={{ color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!loading && favorites.length === 0 && <Typography>There are no favorites yet!!</Typography>}
      {!loading && <FavoritesList favorites={favorites} setFavorites={setFavorites} loading={loading} repository={repository}/>}
    </Container>
  )
}
export default Favorites