import { getIsRefresh } from "../Products/Products-slice";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductSelected,
  selectProductSelected,
} from "../Products/Products-slice";
import s from "./EditPage.module.css";

export function EditPage() {
  const dispatch = useDispatch();
  let productSelected = useSelector(selectProductSelected);
  const productId = productSelected.id;

  const updateProduct = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/product/${String(productId)}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productSelected),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        console.warn(productId);
        console.warn(productSelected);
        dispatch(getIsRefresh(true));
        dispatch(getProductSelected(""));
      });
    });
  };

  return (
    <div className="container">
      <div className={s.formContainer}>
        <h2 className={s.title}>Edit part:</h2>
        <form className={s.form}>
          <label className={s.label}>
            <span className={s.titleInput}>imgUrl:</span>
            <input
              type="text"
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
              type="text"
              value={productSelected.count}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    count: e.target.value,
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>size:</span>
            <input
              type="text"
              value={productSelected.size}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    size: e.target.value,
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
            <span className={s.titleInput}>weight:</span>
            <input
              type="text"
              value={productSelected.weight}
              className={s.input}
              onChange={(e) => {
                dispatch(
                  getProductSelected({
                    ...productSelected,
                    weight: e.target.value,
                  })
                );
              }}
            ></input>
          </label>

          <label className={s.label}>
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
          </label>

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
