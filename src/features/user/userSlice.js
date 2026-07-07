import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userQuery: null,
  module: {
    screen: "",
    filters: {},
    pagination: { current: 1 },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserQuery(state, action) {
      state.userQuery = action.payload;
    },
    setModule(state, action) {
      state.module = { ...state.module, ...action.payload };
    },
    clearUserQuery(state) {
      state.userQuery = null;
    },
    logout(state) {
      state.user = null;
      state.userQuery = null;
      state.module = {
        screen: "",
        filters: {},
        pagination: { current: 1 },
      };
    },
  },
});

export const { setUser, logout, setUserQuery, clearUserQuery, setModule } =
  userSlice.actions;
export default userSlice.reducer;
