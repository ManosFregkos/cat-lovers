import {Card, CardMedia, IconButton, Stack} from "@mui/material";
import {FavouritesType} from "../../../domain/entities/Favorites.ts";
import styles from './favorite_card.module.css'
import FavoriteIcon from "@mui/icons-material/Favorite";

type FavoriteCardProps = {
  favorite: FavouritesType;
  onToggleFavorite: (favoriteId: number) => void;
}

const FavoriteCard = ({favorite, onToggleFavorite}: FavoriteCardProps) => {
  return (
    <Card className={styles.favoriteCard} variant="outlined">
      <CardMedia
        sx={{height: 250}}
        image={favorite.image.url}
        title="cat"
      />
      <Stack position={'absolute'} top={20} right={20}>
        <IconButton onClick={() => onToggleFavorite(favorite.id)}>
          <FavoriteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
export default FavoriteCard;