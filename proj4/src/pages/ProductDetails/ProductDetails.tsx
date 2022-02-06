import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState<null | productType>(
    null
  );
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);

  const getProductDetails = () => {
    axios
      .get(`http://localhost:8000/inventory/${params.id}`)
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const addToCart = () => {
    axios
      .post(
        `http://localhost:8000/cart/update-cart/${params.id}/`,
        {
          cart_item: params.id,
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
    <Box sx={{ mt: "10rem", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80vw",
        }}
      >
        <CardMedia
          component="img"
          image={productDetails?.image}
          alt={productDetails?.name}
          sx={{ width: "50vw", height: "40vw" }}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", width: "30vw" }}
        >
          <Typography>{productDetails?.name}</Typography>
          <Typography>${productDetails?.price}</Typography>
          <Typography>{productDetails?.description}</Typography>
          <Button
            variant="contained"
            sx={{ color: "warning" }}
            onClick={() => {
              addToCart();
            }}
          >
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
