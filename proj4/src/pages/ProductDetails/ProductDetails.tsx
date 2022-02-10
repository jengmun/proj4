import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();

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
    <Box sx={{ mt: "15vh", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "60vw",
          bgcolor: "#ede0d4",
          mb: 2,
          transition: "transform 0.5s",
          ":hover": {
            transform: "translateX(10px)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={productDetails?.image}
          alt={productDetails?.name}
          sx={{ width: "auto", height: "40vw" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "30vw",
            height: "100%",
            p: 5,
          }}
        >
          <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
            {productDetails?.name}
          </Typography>
          <Typography sx={{ mt: 2, mb: 2 }}>
            By {productDetails?.author}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            ${productDetails?.price}
          </Typography>
          <Typography sx={{ mb: 2 }}>{productDetails?.description}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              userID ? addToCart() : history.push("/login");
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
