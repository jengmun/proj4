import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import CartItem from "../Cart/CartItem";
import {
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
    <TableContainer
      sx={{
        mt: "150px",
        boxSizing: "border-box",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textAlign: "center", mb: 3 }} variant="h5">
        Please verify your order details.
      </Typography>
      <Table sx={{ maxWidth: "1000px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="center">Unit Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((item) => {
            return <CartItem item={item}></CartItem>;
          })}

          <TableRow>
            <TableCell sx={{ border: "none" }} />
            <TableCell align="right" sx={{ border: "none" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Total:
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ border: "none" }}>
              <Typography>${totalPrice}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "none" }} />
            <TableCell sx={{ border: "none" }} />
            <TableCell sx={{ border: "none" }}>
              <Button
                variant="contained"
                color="warning"
                sx={{ width: "80%" }}
                onClick={() => {
                  confirmOrder();
                }}
              >
                Pay
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckOut;
