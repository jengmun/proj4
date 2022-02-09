import axios from "axios";
import { productType } from "../../types/types";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = (props: { item: productType }) => {
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);
  const history = useHistory();

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
        maxWidth: "300px",
        maxHeight: "600px",
        width: "40vh",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0)",
        m: 2,
        transition: "transform .5s",
        ":hover": {
          transform: "scale(1.1)",
        },
        ":hover div": {
          display: "none",
        },
        ":hover button": {
          opacity: 1,
          transition: "opacity .5s",
        },
      }}
    >
      <CardMedia
        component="img"
        image={props.item.image}
        alt={props.item.name}
        onClick={() => {
          history.push(`/shop/${props.item.product_id}`);
        }}
        sx={{ cursor: "pointer", height: "70%", width: "auto", pt: 2 }}
      />

      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ lineHeight: "normal", mb: 1 }}>
          {props.item.name}
        </Typography>
        <Typography>${props.item.price}</Typography>
      </CardContent>
      <Button
        sx={{ opacity: 0, mt: 2 }}
        variant="contained"
        color="secondary"
        onClick={() => {
          userID ? addToCart() : history.push("/login");
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
