import {
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartItem = (props: {
  item: {
    cart_item: string;
    cart_item__image: string;
    cart_item__name: string;
    cart_item__price: number;
    quantity: number;
  };
  addToCart?: () => void;
  decreaseCartQuantity?: () => void;
  removeItem?: () => void;
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "20vh",
        width: "50vw",
        margin: "2rem",
        padding: "2rem",
      }}
    >
      <CardMedia
        sx={{ width: "20vh" }}
        component="img"
        image={props.item.cart_item__image}
        alt={props.item.cart_item__name}
      />
      <CardContent>
        <Typography>{props.item.cart_item__name}</Typography>

        {props.addToCart && (
          <ButtonGroup>
            <Button
              onClick={() => {
                props.decreaseCartQuantity?.();
              }}
            >
              -
            </Button>
            <Button>{props.item.quantity}</Button>
            <Button
              onClick={() => {
                props.addToCart?.();
              }}
            >
              +
            </Button>

            <Delete
              onClick={() => {
                props.removeItem?.();
              }}
            >
              <Button></Button>
            </Delete>
          </ButtonGroup>
        )}
        <Typography>${props.item.cart_item__price}</Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
