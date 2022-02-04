import axios from "axios";
import { productType } from "../../types/types";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const ProductCard = (props: { item: productType }) => {
  const userID = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token.access);

  const addToCart = () => {
    axios
      .post(
        `http://localhost:8000/cart/update-cart/${props.item.product_id}/`,
        {
          cart_item: props.item.product_id,
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
    <div>
      <NavLink to={`/shop/${props.item.product_id}`}>
        <h2>{props.item.name}</h2>
      </NavLink>
      <img src={props.item.image} alt={props.item.name}></img>
      <p>${props.item.price}</p>
      <p>{props.item.description}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
