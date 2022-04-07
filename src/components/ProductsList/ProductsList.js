import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditPage } from "../ProductsList/EditPage/EditPage";
import { Products } from "./Products/Products";
import { selectProductSelected } from "../../components/ProductsList/Products/Products-slice";
import s from "./ProductsList.module.css";

export function ProductsList() {
  const dispatch = useDispatch();

  const ProductSelected = useSelector(selectProductSelected);

  return (
    <main className={s.container}>
      {ProductSelected ? <EditPage /> : ""}
      <Products />
    </main>
  );
}
