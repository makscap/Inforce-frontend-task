import { getIsRefresh } from "../Products/Products-slice";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductSelected,
  selectProductSelected,
} from "../Products/Products-slice";
import s from "./EditPage.module.css";
import { useState } from "react";
import { getApi } from "../../services/api";

export function EditPage({ setFiltredProduct, newFilter }) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const dispatch = useDispatch();
  let productSelected = useSelector(selectProductSelected);
  const productId = productSelected.id;

  const updateProduct = (e) => {
    e.preventDefault();

    let copy = Object.assign({}, productSelected);
    copy.size = { ...productSelected, width: width, height: height };

    fetch(
      `https://product-shop-api.herokuapp.com/product/${String(productId)}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copy),
      }
    ).then((result) => {
      result.json().then((resp) => {
        dispatch(getIsRefresh(true));
        dispatch(getProductSelected(""));
        setFiltredProduct(" ");
      });
    });

    newFilter = getApi();
    dispatch(getIsRefresh(true));
  };

  return (
    <div className="container">
      <div className={s.formContainer}>
        <h2 className={s.title}>Edit part:</h2>
        <form className={s.form}>
          <label className={s.label}>
            <span className={s.titleInput}>imgUrl:</span>
            <input
              type="url"
              value={productSelected.imageUrl}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    imageUrl: e.target.value,
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>name:</span>
            <input
              type="text"
              value={productSelected.name}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    name: e.target.value,
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>count:</span>
            <input
              type="number"
              value={productSelected.count}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    count: Number(e.target.value),
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>width:</span>
            <input
              type="number"
              // value={productSelected.size.width}
              className={s.input}
              onChange={(e) => {
                setWidth(Number(e.target.value));
                // dispatch(
                //   getProductSelected({
                //     ...productSelected,
                //     size: { width, height },
                //   })
                // );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>height:</span>
            <input
              type="number"
              // value={productSelected.size.height}
              className={s.input}
              onChange={(e) => {
                setHeight(Number(e.target.value));
                // dispatch(
                //   getProductSelected({
                //     ...productSelected.size,
                //     height: e.target.value,
                //   })
                // );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>weight:</span>
            <input
              type="number"
              value={productSelected.weight}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    weight: Number(e.target.value),
                  })
                );
              }}
            ></input>
          </label>

          {/* <label className={s.label}>
            <span className={s.titleInput}>comments:</span>
            <input
              type="text"
              value={productSelected.comments}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    comments: e.target.value,
                  })
                );
              }}
            ></input>
          </label> */}

          <div>
            <button
              type="submit"
              className={s.buttonSubmit}
              onClick={updateProduct}
            >
              UPDATE
            </button>
            <button
              className={s.buttonCancel}
              onClick={(e) => {
                e.preventDefault();
                dispatch(getProductSelected(""));
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
