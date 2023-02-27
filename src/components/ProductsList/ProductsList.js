import React from "react";
import { Products } from "./Products/Products";
import s from "./ProductsList.module.css";

export function ProductsList() {
  // const ProductSelected = useSelector(selectProductSelected);

  return (
    <main className={s.container}>
      {/* {ProductSelected ? <EditPage /> : ""} */}
      <Products />
    </main>
  );
}
