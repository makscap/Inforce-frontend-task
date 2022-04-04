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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import s from "./Products.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export function Products() {
  const [showModal, setShowModal] = useState(false);

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
        console.log(data);
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
    const attention = window.confirm(
      "Are you sure you want to delete this product from the database?"
    );

    if (attention) {
      fetch(`http://localhost:8000/product/${e.target.id}`, {
        method: "DELETE",
      }).then((e) => e.json());
      // Save it!
      console.log("Product was deleted from the database.");
    } else {
      // Do nothing!
      console.log("Product was not deleted from the database.");
    }

    dispatch(getIsRefresh(true));
  };

  return (
    <div className="container">
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
                  alt="Paris"
                  width="320px"
                  height="240px"
                ></img>
                {/* <span style={{ fontWeight: "bold" }}>imageUrl: </span> */}
                {/* {e.imageUrl} */}
              </li>
              <li className="card-set__text">
                {/* <span style={{ fontWeight: "bold" }}>name: </span> */}
                <h3>{e.name}</h3>
              </li>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>count: </span>
                {e.count}
              </li>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>weight: </span>
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
            <div>
              {/* <ul style={{ backgroundColor: "Khaki" }}>
            {e.comments
              ? e.comments.map((e) => (
                  <li className="list">
                    <span style={{ fontWeight: "bold" }}>comments: {e}</span>
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
            <Modal.Title>{productSelectedInformation?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className=" list" style={{ paddingTop: "20px" }}>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>imageUrl: </span>
                {productSelectedInformation?.imageUrl}
              </li>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>name:</span>
                {productSelectedInformation?.name}
              </li>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>count:</span>
                {productSelectedInformation?.count}
              </li>
              <li className="card-set__text">
                <span style={{ fontWeight: "bold" }}>weight:</span>
                {productSelectedInformation?.weight}
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </ul>
    </div>
  );
}