import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";

const Admin = () => {
  const userID = useAppSelector((state) => state.user.id);
  //   to update
  const token = useAppSelector((state) => state.user.token.access);
  const [orders, setOrders] = useState<
    {
      item__name: string;
      price: number;
      quantity: number;
      order__total: number;
      order__date: string;
    }[]
  >([]);

  const [data, setData] = useState<{}>({});

  const orderList = () => {
    axios
      .get(`http://localhost:8000/order/all-orders/`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    orderList();
  }, []);

  const computeFigures = () => {
    // Revenue
    let revenue = 0;
    orders.map((order) => {
      revenue += order.order__total;
    });
    console.log(revenue);
  };

  useEffect(() => {
    computeFigures();
  }, [orders]);

  return <div></div>;
};

export default Admin;
