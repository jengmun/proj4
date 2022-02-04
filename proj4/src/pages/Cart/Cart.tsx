import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setCart, setTotalPrice } from "../../store/cart";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const userID = useAppSelector((state) => state.user.id);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const fetchCart = () => {
    axios
      .get(`http://localhost:8000/cart/`, { params: { cart_owner: userID } })
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
      .post(`http://localhost:8000/cart/update-cart/${item}/`, {
        cart_item: item,
        cart_owner: userID,
      })
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
      })
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
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
      <h3>Total: ${totalPrice}</h3>
      <NavLink to="/checkout">
        <button>Check Out</button>
      </NavLink>
    </div>
  );
};

export default Cart;
