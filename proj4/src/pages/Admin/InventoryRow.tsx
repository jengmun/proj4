import {
  Button,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const InventoryRow = (props: {
  item: { name: string; quantity: number; product_id: string };
  replenishStock: (product: string, currentQty: number, qty: number) => void;
}) => {
  const [qtyInput, setQtyInput] = useState<number>(0);

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1">{props.item.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{ color: props.item.quantity < 10 ? "red" : "black" }}
        >
          {props.item.quantity}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          onChange={(e) => setQtyInput(Number(e.target.value))}
          type="number"
          sx={{ width: "20%", minWidth: "50px", mr: "1vh" }}
          inputProps={{
            min: 0,
            style: { padding: "clamp(2px, 1vh, 15px)" },
          }}
        />
        <Button
          sx={{
            color: "white",
            backgroundColor: "#ffffff26",
          }}
          onClick={() =>
            props.replenishStock(
              props.item.product_id,
              props.item.quantity,
              qtyInput
            )
          }
        >
          <Typography variant="body1">Replenish</Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InventoryRow;
