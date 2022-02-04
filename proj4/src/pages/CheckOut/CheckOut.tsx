import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import CartItem from "../Cart/CartItem";

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
    <div>
      {cart?.map((item) => {
        return <CartItem item={item}></CartItem>;
      })}
      <h3>Total: ${totalPrice}</h3>

      <button
        onClick={() => {
          confirmOrder();
        }}
      >
        Pay
      </button>
    </div>
  );
};

export default CheckOut;
