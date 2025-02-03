import {useEffect, useState} from "react";
import {CatCardImage} from "../domain/entities/CatCardImage.ts";
import {GetTenCatImages} from "../domain/useCases/GetTenCatImages.ts";
import {Backdrop, Button, CircularProgress, Container} from "@mui/material";
import CatCardsList from "../src/components/HomePage/CatCardsList.tsx";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";

type HomePageProps = {
  repository: CatRepositoryAPI,
}

const HomePage = ({repository} :HomePageProps) => {
  const [catCards, setCatCards] = useState<CatCardImage[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const getTenCatCards = new GetTenCatImages(repository)
        setCatCards(await getTenCatCards.execute())
      }catch (err){
        console.log(err)
      }finally {
        setLoading(false)
      }
    })()
  }, [repository])

  const loadCatCards = async () => {
    try {
      setLoading(true)
      const getTenCatCards = new GetTenCatImages(repository);
      const newCatCards = await getTenCatCards.execute();
      setCatCards((prevCatCards) => [...prevCatCards, ...newCatCards]);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container maxWidth="xl">
      <Backdrop sx={{ color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <CatCardsList catCards={catCards} repository={repository} loading={loading} />
      <Button disabled={loading} variant={'outlined'} onClick={loadCatCards}>Load More Cats</Button>
    </Container>
  )
}
export default HomePage