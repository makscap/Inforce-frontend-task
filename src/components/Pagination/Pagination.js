import React from "react";
import s from "./Pagination.module.css";

function Pagination({ productsPerPage, totalProducts, paginate }) {
  const pageNumbers = [];

  const page = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.paginate}>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a
              href="!#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                paginate(num);
              }}
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
