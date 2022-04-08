import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import s from "./Items.module.css";
import {
  getProductSelected,
  getProductSelectedForInformation,
} from "../ProductsList/Products/Products-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

function Items({ products, handleShow, deleteProduct }) {
  const dispatch = useDispatch();

  // LOADING!!!

  return (
    <ul className="card-set list">
      {products.map((e) => (
        <li className="card-set__item" key={e.id} id={e.id}>
          <ul
            className=" list"
            style={{ paddingTop: "20px", marginTop: "0px" }}
          >
            <li className="card-set__text">
              <img
                src={e.imageUrl}
                alt={e.name}
                width="320px"
                height="240px"
              ></img>
            </li>
            <li className="card-set__text">
              <h3>{e.name}</h3>
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>Quantity: </span>
              {e.count}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>Weight: </span>
              {e.weight}
            </li>
          </ul>
          <div className={s.buttonGroup}>
            <button
              type="button"
              className={s.buttonMore}
              onClick={() => {
                handleShow();
                dispatch(getProductSelectedForInformation(e));
              }}
            >
              MORE
            </button>
            <button
              type="button"
              className={s.buttonEdit}
              onClick={() => {
                dispatch(getProductSelected(e));
                toast.info("The edit page is open! Please, scroll up!");
              }}
            >
              <AiOutlineEdit />
            </button>
            <button
              type="button"
              className={s.buttonRemove}
              onClick={deleteProduct}
              key={e.id}
              id={e.id}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Items;
