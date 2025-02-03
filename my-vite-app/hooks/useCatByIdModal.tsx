import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from "@mui/material";
import {useEffect, useState} from "react";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";
import {CatCardImageById} from "../domain/entities/CatCardImage.ts";
import {GetCatById} from "../domain/useCases/GetCatById.ts";
import CloseIcon from '@mui/icons-material/Close';
import styles from "../src/components/Cards/cat_card.module.css";
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FavoriteBorder} from "@mui/icons-material";
import {AddToFavorites} from "../domain/useCases/AddToFavorites.ts";
import {STATIC_SUB_ID} from "../config.ts";
import {GetAllFavorites} from "../domain/useCases/GetAllFavorites.ts";
import {FavouritesType} from "../domain/entities/Favorites.ts";
import {RemoveFromFavorites} from "../domain/useCases/RemoveFromFavorites.ts";

const useCatByIdModal = (id: string | null, repository: CatRepositoryAPI) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [catCardById, setCatCardById] = useState<CatCardImageById | undefined>(undefined);
  const [openModalLoading, setOpenModalLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavouritesType[]>([])

  useEffect(() => {
    (async () => {
      if (!id) return
      try {
        setOpenModalLoading(true)
        const getCatById = new GetCatById(repository)
        setCatCardById(await getCatById.execute(id))
        const getAllFavorites = new GetAllFavorites(repository)
        setFavorites(await getAllFavorites.execute(STATIC_SUB_ID))
      } catch (err) {
        console.log(err)
      } finally {
        setOpenModalLoading(false)
      }
    })()
  }, [id, repository])

  const handleClose = () => {
    setOpen(false);
    navigate(`/`);
  }

  const addToFavorite = async () => {
    const hasAlreadyFavorite = favorites.find(x => x.image.id === id)
    try {
      if (hasAlreadyFavorite) {
        const removeFromFavorites = new RemoveFromFavorites(repository)
        await removeFromFavorites.execute(hasAlreadyFavorite.id)
        const getAllFavorites = new GetAllFavorites(repository)
        setFavorites(await getAllFavorites.execute(STATIC_SUB_ID))
      } else {
        const addToFavList = new AddToFavorites(repository)
        await addToFavList.execute(STATIC_SUB_ID, id!)
        const getAllFavorites = new GetAllFavorites(repository)
        setFavorites(await getAllFavorites.execute(STATIC_SUB_ID))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const isFavorite = favorites.find(x => x.image.id === id)

  const renderModal = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth={true}>
        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          Cat Detail Modal
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon/>
        </IconButton>
        <DialogContent dividers>
          <Card className={styles.card}>
            <CardMedia
              sx={{height: 250}}
              image={catCardById?.url}
              title="cat"
            />
          </Card>
          {catCardById?.breeds ? "There is additional information about the cat" : "There no is additional information about the cat"}

        </DialogContent>
        <CardActions disableSpacing>
          <Stack width={'100%'} direction="row" spacing={2} justifyContent={'space-between'}>
            <IconButton onClick={addToFavorite} aria-label="add to favorites">
              {isFavorite ? <FavoriteIcon/> : <FavoriteBorder/>}
            </IconButton>
            {catCardById?.breeds &&
              <Button variant={'outlined'} onClick={() => navigate(`/breeds/${catCardById?.breeds[0].id}`)}>Go to
                breeds</Button>}
          </Stack>
        </CardActions>
      </Dialog>
    )
  }

  return {
    setOpen,
    dialog: renderModal(),
    openModalLoading
  }
}
export default useCatByIdModal;