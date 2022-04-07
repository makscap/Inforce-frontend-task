import { useSelector, useDispatch } from "react-redux";
import s from "./SearchLine.module.css";
import { getProducts, selectProducts } from "../Products/Products-slice";
import { changeSearchProduct } from "../SearchLine/SearchLine-slice";
import { useState } from "react";

export function SearchLine() {
  const dispatch = useDispatch();
  let allProducts = useSelector(selectProducts);
  const [filteredProduct, setFiltredProduct] = useState(0);

  const dataSearch = (e) => {
    let valueInput = e.target.value;

    const newFilter = allProducts.filter((value) => {
      return value.name.toLowerCase().includes(valueInput.toLowerCase());
    });

    setFiltredProduct(newFilter);
    dispatch(changeSearchProduct(filteredProduct));
    console.log("newFilter ~ newFilter", newFilter);
  };

  return (
    <div className={s.sortGroup} onChange={dataSearch}>
      <input placeholder="Find your product ... "></input>
    </div>
  );
}
