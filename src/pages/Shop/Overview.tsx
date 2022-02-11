import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { productType } from "../../types/types";
import { Box } from "@mui/material";

const Overview = () => {
  const [allItems, setAllItems] = useState<null | productType[]>(null);

  const getAllItems = () => {
    axios
      .get("https://morning-reaches-28938.herokuapp.com/inventory/")
      .then((response) => {
        setAllItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        ml: "5rem",
        mr: "5rem",
        mt: "15vh",
      }}
    >
      {allItems?.map((item) => {
        return <ProductCard item={item} />;
      })}
    </Box>
  );
};

export default Overview;
