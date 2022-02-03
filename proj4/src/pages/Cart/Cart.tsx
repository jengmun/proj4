import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import CartItem from "./CartItem";

const Cart = () => {
  const userID = useAppSelector((state) => state.user.id);
  const [cart, setCart] = useState<
    {
      cart_item: string;
      cart_item__image: string;
      cart_item__name: string;
      cart_item__price: number;
      quantity: number;
    }[]
  >([]);

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
        setCart(response.data);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {cart?.map((item) => {
        return (
          <CartItem
            item={item}
            addToCart={() => {
              console.log(item.cart_item);
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
    </div>
  );
};

export default Cart;
