const CartItem = (props: {
  item: {
    cart_item: string;
    cart_item__image: string;
    cart_item__name: string;
    cart_item__price: number;
    quantity: number;
  };
  addToCart?: () => void;
  decreaseCartQuantity?: () => void;
  removeItem?: () => void;
}) => {
  return (
    <div>
      <h3>{props.item.cart_item__name}</h3>
      <img src={props.item.cart_item__image} alt={props.item.cart_item__name} />
      <p>${props.item.cart_item__price}</p>
      <p>Quantity: {props.item.quantity}</p>
      {props.addToCart && (
        <>
          <button
            onClick={() => {
              props.addToCart?.();
            }}
          >
            Increase
          </button>
          <button
            onClick={() => {
              props.decreaseCartQuantity?.();
            }}
          >
            Decrease
          </button>
          <button
            onClick={() => {
              props.removeItem?.();
            }}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
