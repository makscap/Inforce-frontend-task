import React, { useState, useEffect } from "react";
import { getApi } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  selectProducts,
  getProductSelected,
  getProductSelectedForInformation,
  selectProductSelectedForInformation,
  selectIsRefresh,
  getIsRefresh,
} from "./Products-slice";
import { SortLine } from "../SortLine/SortLine";
import Modal from "react-bootstrap/Modal";
import s from "./Products.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Products() {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productSelectedInformation = useSelector(
    selectProductSelectedForInformation
  );
  const products = useSelector(selectProducts);
  const isRefresh = useSelector(selectIsRefresh);

  useEffect(() => {
    getApi().then((data) => {
      dispatch(getProducts(data));
    });

    if (!isRefresh) return;
    getApi()
      .then((data) => {
        dispatch(getProducts(data));
        dispatch(getIsRefresh(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isRefresh]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteProduct = (e) => {
    fetch(`https://product-shop-api.herokuapp.com/product/${e.target.id}`, {
      method: "DELETE",
    }).then((e) => e.json());

    getApi();
    dispatch(getIsRefresh(true));
  };

  const postComment = (e) => {
    e.preventDefault();

    const item = {
      ...productSelectedInformation,
      comments: [...productSelectedInformation.comments, comment],
    };

    fetch(
      `https://product-shop-api.herokuapp.com/product/${productSelectedInformation.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    ).then((data) => {
      console.log("new product added");
      data.json();
    });
    // dispatch(changeNewProduct((newProduct = "")));
    // dispatch(changeIsOpenModalAddProduct(false));
    dispatch(getIsRefresh(true));
    setComment("");
    setShowModal(false);

    return;
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className={s.title}>PRODUCT LIST:</h1>
      <SortLine />

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
            <div>
              {/* <ul className=" list" style={{ paddingTop: "20px" }}>
              {e.name
                ? Object.values(e.size).map((item) => (
                    <li key={item} className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>size: </span>
                      {item}
                    </li>
                  ))
                : ""}
            </ul> */}
            </div>
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
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Product card</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={productSelectedInformation?.imageUrl}
              alt={productSelectedInformation?.name}
              width="465px"
              className={s.image}
            ></img>
            <ul className={s.card}>
              <li className="card-set__text"></li>
              <li className="card-set__text">
                <h3 className={s.list}>
                  Name: {productSelectedInformation?.name}
                </h3>
              </li>
              <li className="card-set__text">
                <p className={s.list}>
                  count: {productSelectedInformation?.count}
                </p>
              </li>
              <li className="card-set__text">
                <p className={s.list}>
                  size: {productSelectedInformation?.size?.width}
                  <span> x </span>
                  {productSelectedInformation?.size?.height}
                </p>
              </li>

              <li className="card-set__text">
                <p className={s.list}>
                  weight:{productSelectedInformation?.weight}
                </p>
              </li>
              {productSelectedInformation && (
                <li className={s.comments_item}>
                  <p className={s.list}>Comments: </p>

                  <ul className={s.comments_list}>
                    {productSelectedInformation &&
                      productSelectedInformation.comments.map((e, i) => (
                        <li className={s.comments_item} key={i}>
                          {/* <textarea> */}
                          <p className={s.list}>
                            <span>ID: {i}</span>
                          </p>
                          <p className={s.list}>{e}</p>
                          {/* </textarea> */}
                        </li>
                      ))}
                  </ul>
                </li>
              )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <form className={s.formComment}>
              <input
                type="text"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className={s.formItems}
              ></input>
              <button
                className={comment ? s.feedback : s.crash}
                disabled={!comment}
                onClick={(e) => postComment(e)}
              >
                LEAVE FEEDBACK
              </button>
              <button
                className={s.close}
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(e);
                }}
              >
                CLOSE
              </button>
            </form>
          </Modal.Footer>
        </Modal>
      </ul>
    </div>
  );
}
