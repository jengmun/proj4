import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

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

  const monthFormatting = (month: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[parseInt(month, 10) - 1];
  };

  return (
    <Box
      sx={{
        mt: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Orders
      </Typography>

      {orders.map((order) => {
        return (
          <Accordion
            sx={{
              width: "50%",
              minWidth: "300px",
              maxWidth: "1000px",
              mb: 2,
              boxShadow: "2px 2px 10px grey",
            }}
          >
            <AccordionSummary
              sx={{ background: "linear-gradient(135deg, #D7CEC7, #C09F80)" }}
            >
              <Typography
                variant="h4"
                sx={{ width: "70%", letterSpacing: "1px" }}
              >
                Order No: {order.order_no}
              </Typography>
              <Box sx={{ width: "30%", textAlign: "right" }}>
                <Typography variant="h5">
                  {`${order.date.slice(8, 10)} ${monthFormatting(
                    order.date.slice(5, 7)
                  )} ${order.date.slice(0, 4)}`}
                </Typography>
                <Typography variant="h5">${order.total}</Typography>
              </Box>
            </AccordionSummary>
            {order.details.map((item) => {
              return (
                <AccordionDetails
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ width: "70%", display: "flex" }}>
                    <img src={item["item__image"]} style={{ width: "40%" }} />
                    <Typography variant="h4" sx={{ p: 2 }}>
                      {item["item__name"]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography variant="h5">
                      Quantity: {item["quantity"]}
                    </Typography>
                    <Typography variant="h5">
                      ${item["price"] * item["quantity"]}
                    </Typography>
                  </Box>
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Account;
