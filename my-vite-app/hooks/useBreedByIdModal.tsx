import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";
import {GetBreedById} from "../domain/useCases/GetBreedById.ts";
import {CatCardImage} from "../domain/entities/CatCardImage.ts";
import CatCard from "../src/components/Cards/CatCard.tsx";

const useBreedByIdModal = (id: string | null, repository: CatRepositoryAPI) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [breedsById, setBreedsById] = useState<CatCardImage[]>([]);
  const [openModalLoading, setOpenModalLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return
      try {
        setOpenModalLoading(true)
        const getBreedById = new GetBreedById(repository)
        setBreedsById(await getBreedById.execute(id))
      } catch (err) {
        console.log(err)
      } finally {
        setOpenModalLoading(false)
      }
    })()
  }, [id, repository])

  const handleClose = () =>  {
    setOpen(false);
    navigate(`/breeds`);
  }

  const handleSelectedCat = (cat: CatCardImage) => {
    setOpen(true)
    navigate(`/cat/${cat.id}`);
  }

  const renderModal = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth={true}>
        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          Breed Detail Modal
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
          {breedsById.map(cat => (
            <CatCard cat={cat} handleSelectedCat={handleSelectedCat} />
          ))}
        </DialogContent>
      </Dialog>
    )
  }


  return {
    setOpen,
    dialog: renderModal(),
    openModalLoading
  }
}
export default useBreedByIdModal;