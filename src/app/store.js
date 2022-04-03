import { configureStore } from "@reduxjs/toolkit";
import ButtonAddProductSlice from "../components/ProductsList/ButtonAddProduct/ButtonAddProduct-slice";
import ProductsSlice from "../components/ProductsList/Products/Products-slice";
import ProductsListSlice from "../components/ProductsList/ProductsList-slice";

export const store = configureStore({
  reducer: {
    productList: ProductsListSlice,
    products: ProductsSlice,
    addProduct: ButtonAddProductSlice,
    // settings:
  },
});
