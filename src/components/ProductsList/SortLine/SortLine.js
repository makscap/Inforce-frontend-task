import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./SortLine.module.css";
import { getProducts, selectProducts } from "../Products/Products-slice";

export function SortLine() {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  console.log("SortLine ~ allProducts first", allProducts);

  const [dataList, setDataList] = useState(allProducts);

  // const sortByNameAtoZ = (name) => {
  // const types = {
  //   name: "name",
  //   count: "count",
  // };

  const sortArray = (type) => {
    const types = {
      nameA: "name",
      nameZ: "name",
      count1: "count",
      count9: "count",
    };

    const sortProperty = types[type];

    const sorted = [...allProducts].sort((a, b) => {
      if (a[sortProperty] < b[sortProperty]) {
        return -1;
      }
      if (a[sortProperty] > b[sortProperty]) {
        return 1;
      }
      return 0;
    });
    console.log(sorted);
    dispatch(getProducts(sorted));
  };

  return (
    <div className={s.sortGroup}>
      <label htmlFor="sort" className={s.label}>
        Sort:
      </label>
      <select id="sort" name="sort" onChange={(e) => sortArray(e.target.value)}>
        <option defaultValue="nameA">Name product A-Z</option>
        <option value="nameZ">Name product Z-A</option>
        <option value="count1">Count 1-9</option>
        <option value="count9">Count 9-1</option>
      </select>
    </div>
  );
}
