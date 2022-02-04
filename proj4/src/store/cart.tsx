import { createSlice } from "@reduxjs/toolkit";
import { cartType } from "../types/types";

const initialState: { cart: cartType[]; totalPrice: number } = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const { setCart, setTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
