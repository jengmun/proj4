import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setCart, setTotalPrice } from "../../store/cart";
import CartItem from "./CartItem";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const history = useHistory();

  const fetchCart = () => {
    axios
      .get(`http://localhost:8000/cart/`, {
        params: { cart_owner: userID },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        response.data.sort(
          (a: { cart_item__name: string }, b: { cart_item__name: string }) => {
            const nameA = a.cart_item__name.toUpperCase();
            const nameB = b.cart_item__name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        );
        dispatch(setCart(response.data));
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const computeTotalPrice = () => {
    let sum = 0;
    cart.map((item) => {
      sum += item.cart_item__price * item.quantity;
    });
    dispatch(setTotalPrice(sum));
  };

  useEffect(() => {
    computeTotalPrice();
  }, [cart]);

  const addToCart = (item: string) => {
    axios
      .post(
        `http://localhost:8000/cart/update-cart/${item}/`,
        {
          cart_item: item,
          cart_owner: userID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // reduce quantity of item
  const decreaseCartQuantity = (item: string) => {
    axios
      .delete(`http://localhost:8000/cart/update-cart/${item}/`, {
        params: { cart_owner: userID },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // full delete from cart
  const removeItem = (item: string) => {
    axios
      .delete(`http://localhost:8000/cart/remove-from-cart/${item}/`, {
        params: { cart_owner: userID },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {cart.length ? (
        <TableContainer
          sx={{
            mt: "150px",
            boxSizing: "border-box",
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                return (
                  <CartItem
                    item={item}
                    addToCart={() => {
                      addToCart(item.cart_item);
                    }}
                    decreaseCartQuantity={() => {
                      decreaseCartQuantity(item.cart_item);
                    }}
                    removeItem={() => {
                      removeItem(item.cart_item);
                    }}
                  ></CartItem>
                );
              })}

              <TableRow>
                <TableCell sx={{ border: "none" }} />
                <TableCell align="right" sx={{ border: "none" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Subtotal:
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <Typography>${totalPrice}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "none" }} />{" "}
                <TableCell sx={{ border: "none" }} />
                <TableCell sx={{ border: "none" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: "80%" }}
                    onClick={() => {
                      history.push("/checkout");
                    }}
                  >
                    Check Out
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            mt: "150px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Your cart is empty!</Typography>
          <NavLink to="/shop">
            <Button>Shop here!</Button>
          </NavLink>
        </Box>
      )}
    </>
  );
};

export default Cart;
