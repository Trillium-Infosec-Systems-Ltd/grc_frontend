import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userQuery: null,
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
    clearUserQuery(state) {
      state.userQuery = null;
    },
    logout(state) {
      state.user = null;
      state.userQuery = null;
    },
  },
});

export const { setUser, logout, setUserQuery, clearUserQuery } =
  userSlice.actions;
export default userSlice.reducer;
