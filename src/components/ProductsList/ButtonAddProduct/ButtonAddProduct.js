import { useSelector, useDispatch } from "react-redux";
import {
  changeIsOpenModalAddProduct,
  selectIsOpenModalAddProduct,
  changeNewProduct,
  selectNewProduct,
} from "./ButtonAddProduct-slice";
import { getIsRefresh, selectProducts } from "../Products/Products-slice";
import Modal from "react-bootstrap/Modal";
import s from "./ButtonAddProduct.module.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi } from "../../services/api";
import { GrAdd, GrChapterAdd } from "react-icons/gr";

const ButtonAddProduct = () => {
  const [fieldForm, setFieldForm] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const dispatch = useDispatch();
  let IsOpenModalAddProduct = useSelector(selectIsOpenModalAddProduct);
  let newProduct = useSelector(selectNewProduct);
  let allProducts = useSelector(selectProducts);

  const postProduct = (e) => {
    e.preventDefault();

    const item = {
      imageUrl: newProduct.imageUrl,
      name: newProduct.name,
      count: Number(newProduct.count),
      weight: newProduct.weight,
      comments: [newProduct.comments],
      size: { width: width, height: height },
    };

    if (
      item.imageUrl?.trim() &&
      item.name?.trim() &&
      String(item.count)?.trim() &&
      String(item.size.width)?.trim() &&
      String(item.size.height)?.trim() &&
      String(item.weight)?.trim() &&
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
        console.warn(item);
        data.json();
      });

      toast.success(
        "The product was added! You can find it at the bottom page."
      );

      dispatch(changeNewProduct((newProduct = "")));
      dispatch(changeIsOpenModalAddProduct(false));
      dispatch(getIsRefresh(true));
      setFieldForm(false);

      return;
    }
    getApi();
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

  const postSomeProduct = (e) => {
    e.preventDefault();

    const findEl = Math.max.apply(
      Math,
      allProducts.map(function (e) {
        return e.id;
      })
    );

    console.log("findEl ~ findEl", findEl);

    const item = {
      imageUrl:
        "https://avatars.mds.yandex.net/get-mpic/4529531/img_id8845833908614038895.jpeg/orig",
      name: `NEW PRODUCT ${findEl}`,
      count: 15,
      weight: 155,
      comments: [
        "Synonyms for SOMETHING: being, commodity, entity, existent, individual, individuality, integer, object.",
      ],
      size: { width: 155, height: 155 },
    };

    fetch(`https://product-shop-api.herokuapp.com/product/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((data) => {
      console.log("new some product added");
      data.json();
    });
    dispatch(getIsRefresh(true));
    return;
  };

  return (
    <div>
      <ToastContainer />
      <button
        type="button"
        className={s.buttonAdd}
        onClick={() => {
          dispatch(changeIsOpenModalAddProduct(true));
        }}
      >
        <GrAdd />
      </button>
      <button
        type="button"
        className={s.buttonAddSome}
        onClick={postSomeProduct}
      >
        <GrChapterAdd />
        {/* QUICK ADD */}
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
                  setWidth(Number(e.target.value));
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
                  setHeight(Number(e.target.value));
                }}
              />
            </div>

            <div className={s.labelInput}>
              <label htmlFor="weight" className={s.label}>
                weight:
              </label>
              <input
                type="number"
                required
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      weight: Number(e.target.value),
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
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ButtonAddProduct;
