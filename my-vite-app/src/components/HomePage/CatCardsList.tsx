import {Backdrop, CircularProgress, Stack} from "@mui/material";
import CatCard from "../Cards/CatCard.tsx";
import styles from "./cat_card_list.module.css"
import {CatCardImage} from "../../../domain/entities/CatCardImage.ts";
import {CatRepositoryAPI} from "../../../infrastructure/CatRepositoryAPI.ts";
import useCatByIdModal from "../../../hooks/useCatByIdModal.tsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';

type CatCardsListProps = {
  catCards: CatCardImage[]
  repository: CatRepositoryAPI
  loading: boolean
}

const CatCardsList = ({catCards, repository, loading}: CatCardsListProps) => {
  const navigate = useNavigate();
  const {catId} = useParams<{ catId: string }>()
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const {dialog, setOpen, openModalLoading} = useCatByIdModal(selectedCatId, repository);

  useEffect(() => {
    if(catId) {
      setSelectedCatId(catId);
      setOpen(true)
    }
  }, [catId, setOpen]);

  const handleSelectedCat = (cat: CatCardImage) => {
    setSelectedCatId(cat.id)
    setOpen(true)
    navigate(`/cat/${cat.id}`);
  }

  return (
    <Stack className={styles.cardContainer} direction="row" flexWrap="wrap" alignItems="center">
      {catCards.map((cat) => (
        <Stack className={styles.cardItem} key={cat.id}><CatCard cat={cat}
                                                                 handleSelectedCat={handleSelectedCat}/></Stack>
      ))}
      {!openModalLoading && !loading ? dialog : <Backdrop sx={{color: "#fff", zIndex: 1000}} open={openModalLoading}>
        <CircularProgress color="primary"/>
      </Backdrop>}
    </Stack>
  );
};
export default CatCardsList;
