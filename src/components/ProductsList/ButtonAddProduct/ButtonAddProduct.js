import { useSelector, useDispatch } from "react-redux";
import {
  changeIsOpenModalAddProduct,
  selectIsOpenModalAddProduct,
  changeNewProduct,
  selectNewProduct,
} from "./ButtonAddProduct-slice";
import { getIsRefresh } from "../Products/Products-slice";
import Modal from "react-bootstrap/Modal";
import s from "./ButtonAddProduct.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

const ButtonAddProduct = () => {
  const [fieldForm, setFieldForm] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const dispatch = useDispatch();
  let IsOpenModalAddProduct = useSelector(selectIsOpenModalAddProduct);
  let newProduct = useSelector(selectNewProduct);

  const postProduct = (e) => {
    e.preventDefault();

    // const item = {
    //   imageUrl: newProduct.imageUrl ? newProduct.imageUrl : "empty",
    //   name: newProduct.name ? newProduct.name : "empty",
    //   count: newProduct.count ? newProduct.count : "empty",
    //   size: newProduct.size ? newProduct.size : "empty",
    //   weight: newProduct.weight ? newProduct.weight : "empty",
    //   comments: newProduct.comments ? newProduct.comments : "empty",
    // };

    const item = {
      imageUrl: newProduct.imageUrl,
      name: newProduct.name,
      count: Number(newProduct.count),
      size: newProduct.size,
      weight: newProduct.weight,
      comments: [newProduct.comments],
      size: { width: Number(width), height: Number(height) },
    };

    if (
      item.imageUrl?.trim() &&
      item.name?.trim() &&
      String(item.count)?.trim() &&
      String(item.size.width)?.trim() &&
      String(item.size.height)?.trim() &&
      item.weight?.trim() &&
      String(item.comments)?.trim()
    ) {
      fetch("https://product-shop-api.herokuapp.com/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((data) => {
        console.log("new product added");
        data.json();
      });
      dispatch(changeNewProduct((newProduct = "")));
      dispatch(changeIsOpenModalAddProduct(false));
      dispatch(getIsRefresh(true));
      setFieldForm(false);

      return;
    }
    setFieldForm(true);
    console.log("You must fill all fields!");
  };

  const handleClose = (e) => {
    dispatch(changeIsOpenModalAddProduct(false));
  };

  const cancelAddTheProduct = (e) => {
    const attention = window.confirm(
      "Are you sure you don't want to add this product into the database?"
    );
    if (attention) {
      handleClose();
      console.log("Product was not added to the database.");
    } else {
      console.log("Product was canceled.");
    }
    e.preventDefault();
    setFieldForm(false);
  };

  return (
    <div>
      <button
        type="button"
        className={s.buttonAdd}
        onClick={() => dispatch(changeIsOpenModalAddProduct(true))}
      >
        ADD PRODUCT
      </button>

      <Modal show={IsOpenModalAddProduct} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={s.title}>ADD new product in the collection</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={s.labelInput}>
              <label htmlFor="imageUrl" className={s.label}>
                imageUrl:
              </label>
              <input
                // required
                type="name"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      imageUrl: e.target.value,
                    })
                  );
                }}
                minLength="1"
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="name" className={s.label}>
                name:
              </label>
              <input
                type="name"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  );
                  setFieldForm(false);
                }}
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="count" className={s.label}>
                count:
              </label>
              <input
                type="number"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      count: e.target.value,
                    })
                  );
                }}
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="width" className={s.label}>
                width:
              </label>
              <input
                type="number"
                required
                onChange={(e) => {
                  // dispatch(
                  //   changeNewProduct({
                  //     ...newProduct,
                  //     width: e.target.value,
                  //   })
                  // );
                  setWidth(e.target.value);
                }}
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="height" className={s.label}>
                height:
              </label>
              <input
                type="number"
                required
                onChange={(e) => {
                  // dispatch(
                  //   changeNewProduct({
                  //     ...newProduct,
                  //     height: e.target.value,
                  //   })
                  // );
                  setHeight(e.target.value);
                }}
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="weight" className={s.label}>
                weight:
              </label>
              <input
                type="weight"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      weight: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className={s.labelInput}>
              <label htmlFor="comments" className={s.label}>
                comments:
              </label>
              <input
                type="comments"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      comments: e.target.value,
                    })
                  );
                }}
              />
            </div>
            {fieldForm ? (
              <span className={s.warning_message}>
                This fields cannot be empty
              </span>
            ) : (
              ""
            )}
            <div className={s.btnGroup}>
              <input
                type="submit"
                value="CONFIRM"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={postProduct}
                className={s.btnDefault}
              />
              <input
                type="submit"
                value="CANCEL"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={cancelAddTheProduct}
                className={s.btnDefault}
              />
            </div>
          </form>
          {/* <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              marginRight: "60px",
            }}
          >
            <label style={{ margin: "10px 0px" }}>
              imgUrl:
              <input
                type="text"
                id="imgUrl"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      imageUrl: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              name:
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
                required
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              count:
              <input
                type="text"
                id="count"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      count: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
                required
              ></input>
            </label>

            <label id="size" style={{ margin: "10px 0px" }}>
              size:
              <input
                type="text"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      size: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
                required
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px 0px" }}>
              weight:
              <input
                type="text"
                id="weight"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      weight: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
                required
              ></input>
            </label>
            <label id="comments" style={{ margin: "10px 0px" }}>
              comments:
              <input
                type="text"
                id="comments"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      comments: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
                required
              ></input>
            </label>
            <div className={s.btnGroup}>
              <button
                type="button"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={postProduct}
                className={s.btnDefault}
              >
                CONFIRM
              </button>
              <button
                type="button"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={cancelAddTheProduct}
                className={s.btnDefault}
              >
                CANCEL
              </button>
            </div>
          </form> */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ButtonAddProduct;
