import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { productType } from "../../types/types";

const Overview = () => {
  const [allItems, setAllItems] = useState<null | productType[]>(null);

  const getAllItems = () => {
    axios
      .get("http://localhost:8000/inventory/")
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
    <div>
      {allItems?.map((item) => {
        return <ProductCard item={item} />;
      })}
    </div>
  );
};

export default Overview;
