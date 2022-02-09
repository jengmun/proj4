import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    token: { access: "", refresh: "" },
    id: 0,
  },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logout(state) {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.token = { access: "", refresh: "" };
      state.id = 0;
    },
  },
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
