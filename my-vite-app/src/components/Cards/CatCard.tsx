import styles from "./cat_card.module.css"
import {CatCardImage} from "../../../domain/entities/CatCardImage.ts";
import {Card, CardMedia} from "@mui/material";

type CatCardProps = {
  cat: CatCardImage;
  handleSelectedCat (cat:CatCardImage) : void
}

const CatCard = ({cat, handleSelectedCat}: CatCardProps) => {
  return (
    <Card className={styles.card}>
      <CardMedia
        sx={{height: 250}}
        image={cat.url}
        title="cat"
        onClick={() => handleSelectedCat(cat)}
      />
    </Card>
  );
}
export default CatCard;