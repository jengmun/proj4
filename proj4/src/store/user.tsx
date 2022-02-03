import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { email: "", token: "", id: 0 },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logout(state) {
      state.email = "";
      state.token = "";
      state.id = 0;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
