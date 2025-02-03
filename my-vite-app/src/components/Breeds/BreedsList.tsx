import {Backdrop, CircularProgress, Stack} from "@mui/material";
import {Breed} from "../../../domain/entities/Breeds.ts";
import BreedCard from "../Cards/BreedCard.tsx";
import {useEffect, useState} from "react";
import {CatRepositoryAPI} from "../../../infrastructure/CatRepositoryAPI.ts";
import {useNavigate, useParams} from "react-router-dom";
import useBreedByIdModal from "../../../hooks/useBreedByIdModal.tsx";

type BreedsListProps = {
  breeds: Breed[];
  loading: boolean;
  repository: CatRepositoryAPI
}

const BreedsList = ({breeds, loading, repository}: BreedsListProps) => {
  const navigate = useNavigate();
  const {breedId} = useParams<{ breedId: string }>()
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const {setOpen, openModalLoading, dialog} = useBreedByIdModal(selectedBreedId, repository)

  useEffect(() => {
    if(breedId) {
      setSelectedBreedId(breedId);
      setOpen(true)
    }
  }, [setOpen, breedId]);

  const handleBreedSelect = (breed: Breed) => {
    if(!breed.image.url) return
    setSelectedBreedId(breed.id)
    setOpen(true)
    navigate(`/breeds/${breed.id}`);
  }

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="center">
      {breeds.map((breed) => (
        <Stack key={breed.id}><BreedCard breed={breed} handleBreedSelect={handleBreedSelect} /></Stack>
      ))}
      {!openModalLoading && !loading ? dialog : <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading || openModalLoading}>
        <CircularProgress color="primary"/>
      </Backdrop>}
    </Stack>
  )
}
export default BreedsList