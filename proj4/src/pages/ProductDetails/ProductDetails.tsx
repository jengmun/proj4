import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";

const ProductDetails = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState<null | productType>(
    null
  );
  const userID = useAppSelector((state) => state.user.id);

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
      .post(`http://localhost:8000/cart/update-cart/${params.id}/`, {
        cart_item: params.id,
        cart_owner: userID,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>{productDetails?.name}</h2>
      <img src={productDetails?.image} alt={productDetails?.name}></img>
      <p>${productDetails?.price}</p>
      <p>{productDetails?.description}</p>
      <button
        onClick={() => {
          addToCart();
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductDetails;
