import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cartReducer from './cart/cartSlice';
import searchReducer from './search/searchSlice'; // Import searchReducer

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  cart: cartReducer,
  search: searchReducer, // Thêm search vào combineReducers
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
