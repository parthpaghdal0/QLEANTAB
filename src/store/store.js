import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import testSlice from "./slices/test";

const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    products: productReducer,
  },
})

export const testActions = testSlice.actions

export default store
