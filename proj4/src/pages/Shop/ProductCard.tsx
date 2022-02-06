import axios from "axios";
import { productType } from "../../types/types";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = (props: { item: productType }) => {
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);

  const addToCart = () => {
    axios
      .post(
        `http://localhost:8000/cart/update-cart/${props.item.product_id}/`,
        {
          cart_item: props.item.product_id,
          cart_owner: userID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card
      sx={{
        width: "20vw",
        height: "20vw",
        border: "1px solid black",
        m: "2rem",
      }}
    >
      <NavLink to={`/shop/${props.item.product_id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="70%"
            image={props.item.image}
            alt={props.item.name}
          />
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>{props.item.name}</Typography>
            <Typography>${props.item.price}</Typography>
          </CardContent>
        </CardActionArea>
      </NavLink>
      <Button variant="contained" color="secondary" onClick={addToCart}>
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
