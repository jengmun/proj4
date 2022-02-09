import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import CartItem from "../Cart/CartItem";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const CheckOut = () => {
  const userID = useAppSelector((state) => state.user.id);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const token = useAppSelector((state) => state.user.token.access);
  const history = useHistory();

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
        history.push("/account");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TableContainer sx={{ mt: "150px", boxSizing: "border-box", p: 2 }}>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Please verify your order details.
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((item) => {
            return <CartItem item={item}></CartItem>;
          })}
        </TableBody>
      </Table>{" "}
      <Box sx={{ float: "right", p: 5 }}>
        <Typography sx={{ pb: 3 }}>Total: ${totalPrice}</Typography>
        <Button
          onClick={() => {
            confirmOrder();
          }}
        >
          Pay
        </Button>
      </Box>
    </TableContainer>
  );
};

export default CheckOut;
