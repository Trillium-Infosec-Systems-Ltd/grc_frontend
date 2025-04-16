import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice.js';

export default combineReducers({
    session: userReducer,
})