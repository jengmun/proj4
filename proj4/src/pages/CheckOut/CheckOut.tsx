import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import CartItem from "../Cart/CartItem";
import { Box, Button, Typography } from "@mui/material";

const CheckOut = () => {
  const userID = useAppSelector((state) => state.user.id);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const token = useAppSelector((state) => state.user.token.access);

  const confirmOrder = () => {
    axios
      .post(
        `http://localhost:8000/order/create/`,
        {
          cart_owner: userID,
          total: totalPrice,
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
    <Box
      sx={{
        mt: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {cart?.map((item) => {
        return <CartItem item={item}></CartItem>;
      })}
      <Typography>Total: ${totalPrice}</Typography>

      <Button
        onClick={() => {
          confirmOrder();
        }}
      >
        Pay
      </Button>
    </Box>
  );
};

export default CheckOut;
