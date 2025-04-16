import { createSlice } from '@reduxjs/toolkit';
import { removeLocalItem } from '../utils/utils';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      removeLocalItem('userState');
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
