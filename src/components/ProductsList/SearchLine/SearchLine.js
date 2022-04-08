import React from "react";
import s from "./SearchLine.module.css";

function SearchLine({ dataSearch }) {
  return (
    <form onChange={dataSearch}>
      <input
        placeholder="Find your product ... "
        className={s.inputSearch}
      ></input>
    </form>
  );
}

export default SearchLine;
