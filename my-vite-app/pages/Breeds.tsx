import {useEffect, useState} from "react";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";
import {Backdrop, CircularProgress, Container} from "@mui/material";
import {GetAllBreeds} from "../domain/useCases/GetAllBreeds.ts";
import {Breed} from "../domain/entities/Breeds.ts";
import BreedsList from "../src/components/Breeds/BreedsList.tsx";

type BreedsProps = {
  repository: CatRepositoryAPI
}

const Breeds = ({repository}: BreedsProps) => {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const getAllBreeds = new GetAllBreeds(repository)
        setBreeds(await getAllBreeds.execute())
      }catch (err){
        console.log(err)
      }finally {
        setLoading(false)
      }
    })()
  }, [repository])

  console.log(breeds,"bre")
  return (
    <Container maxWidth={'xl'}>
      <Backdrop sx={{ color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!loading && <BreedsList breeds={breeds} loading={loading} repository={repository} />}
    </Container>
  )
}
export default Breeds