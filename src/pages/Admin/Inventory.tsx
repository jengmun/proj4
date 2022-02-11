import {
  Box,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import InventoryRow from "./InventoryRow";

const Inventory = () => {
  const token = useAppSelector((state) => state.admin.token.access);
  const [inventory, setInventory] = useState<
    { name: string; product_id: string; quantity: number }[]
  >([]);

  const fetchData = () => {
    axios
      .get("https://morning-reaches-28938.herokuapp.com/inventory/")
      .then((response) => {
        const sortedData = response.data.sort(
          (a: { name: string }, b: { name: string }) => {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }

            return 0;
          }
        );

        setInventory(sortedData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const replenishStock = (product: string, currentQty: number, qty: number) => {
    if (!qty) {
      return;
    }
    axios
      .post(
        `https://morning-reaches-28938.herokuapp.com/inventory/update-inventory/${product}/`,
        {
          quantity: currentQty + qty,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => fetchData());
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(135deg, #f5cb75, #02a5e9)",
      }}
    >
      <TableContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ml: "20%",
          mr: "20%",
          width: "60%",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" sx={{ mt: "2vh", mb: "2vh" }}>
          Inventory Management
        </Typography>
        <Table sx={{ mb: "2vh" }}>
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Product</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Quantity</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Stock up!</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <InventoryRow item={item} replenishStock={replenishStock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inventory;
