import {Card, CardMedia} from "@mui/material";
import {Breed} from "../../../domain/entities/Breeds.ts";
import styles from './breed_card.module.css'

type BreedCardProps = {
  breed: Breed
  handleBreedSelect: (breed: Breed) => void
}

const BreedCard = ({breed, handleBreedSelect}: BreedCardProps) => {

  return (
    <Card className={styles.breedCard} variant="outlined">
      <CardMedia
        sx={{
          height: 250,
          cursor: breed.image ? 'pointer' : 'default'
        }}
        image={breed.image ? breed.image.url : "https://as2.ftcdn.net/v2/jpg/04/99/10/95/1000_F_499109533_eSJkDKEilqy5EDyE8uJUBool0Ex5A34R.jpg"}
        title="breed"
        onClick={() => handleBreedSelect(breed)}
      />
    </Card>
  )
}
export default BreedCard