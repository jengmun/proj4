import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import cartReducer from "./cart";
import adminReducer from "./admin";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
