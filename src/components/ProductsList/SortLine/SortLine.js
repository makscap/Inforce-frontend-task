import React from "react";
import s from "./SortLine.module.css";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";

export function SortLine() {
  return (
    <div className={s.sortGroup}>
      <label htmlFor="sort" className={s.label}>
        Sort:
      </label>
      <select id="sort" name="sort">
        <option defaultValue="nameA">Name product A-Z</option>
        <option value="nameZ">Name product Z-A</option>
        <option value="count1">Count 1-9</option>
        <option value="count9">Count 9-1</option>
      </select>
    </div>
  );
}
