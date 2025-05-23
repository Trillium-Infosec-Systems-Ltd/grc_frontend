import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./combinedReducers.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "session",
  ],
};
const persistedReducer = persistReducer(persistConfig, combineReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER', 'persist/FLUSH', 'persist/PAUSE', 'persist/PURGE'],
      },
    }),
});

export const persistor = persistStore(store);