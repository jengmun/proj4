import {
  Button,
  ButtonGroup,
  CardMedia,
  Typography,
  TableRow,
  TableCell,
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
    <TableRow>
      <TableCell
        component="th"
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        <CardMedia
          sx={{ width: "20vh" }}
          component="img"
          image={props.item.cart_item__image}
          alt={props.item.cart_item__name}
        />
        <Typography sx={{ ml: 2, textTransform: "uppercase" }}>
          {props.item.cart_item__name}
        </Typography>
      </TableCell>
      <TableCell align="center">
        {props.addToCart ? (
          <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
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
              sx={{ cursor: "pointer", ml: 2 }}
              onClick={() => {
                props.removeItem?.();
              }}
            ></Delete>
          </ButtonGroup>
        ) : (
          <Typography align="left">{props.item.quantity}</Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <Typography>${props.item.cart_item__price}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
