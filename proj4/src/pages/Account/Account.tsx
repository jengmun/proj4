import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

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
    <Box
      sx={{
        mt: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Orders</Typography>
      {orders.map((order) => {
        return (
          <Card
            sx={{
              width: "50vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography>{order.order_no}</Typography>
            {order.details.map((item) => {
              return (
                <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CardMedia
                    sx={{ width: "20%" }}
                    component="img"
                    image={item["item__image"]}
                  />
                  <CardContent>
                    <Typography>{item["item__name"]}</Typography>
                    <Typography>${item["price"]}</Typography>
                    <Typography>Quantity: {item["quantity"]}</Typography>
                  </CardContent>
                </Card>
              );
            })}
            <CardContent>
              <Typography>${order.total}</Typography>
              <Typography>Date: {order.date}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Account;
