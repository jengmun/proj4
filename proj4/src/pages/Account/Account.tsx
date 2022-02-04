import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";

const Account = () => {
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);
  const [orders, setOrders] = useState<
    {
      order_no: string;
      details: {
        item__name: string;
        item__image: string;
        price: number;
        quantity: number;
      }[];
      total: number;
      date: string;
    }[]
  >([]);

  const orderList = () => {
    axios
      .get(`http://localhost:8000/order/`, {
        params: {
          cart_owner: userID,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    orderList();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => {
        return (
          <div>
            <h1>{order.order_no}</h1>
            {order.details.map((item) => {
              return (
                <>
                  <h3>{item["item__name"]}</h3>
                  <img src={item["item__image"]} />
                  <h3>${item["price"]}</h3>
                  <h3>Quantity: {item["quantity"]}</h3>
                </>
              );
            })}
            <p>${order.total}</p>
            <p>Date: {order.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Account;
