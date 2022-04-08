import React, { useState, useEffect } from "react";
import { getApi } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  selectProducts,
  selectProductSelectedForInformation,
  selectIsRefresh,
  getIsRefresh,
} from "./Products-slice";
import { SortLine } from "../SortLine/SortLine";
import Modal from "react-bootstrap/Modal";
import s from "./Products.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changeSearchProduct } from "../../ProductsList/SearchLine/SearchLine-slice";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";
import Items from "../../Items/Items";
import FilterProduct from "../FilterProduct/FilterProduct";

export function Products() {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [filteredProduct, setFiltredProduct] = useState(" ");

  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [productsPerPage] = useState(2); // Pagination

  const dispatch = useDispatch();
  const productSelectedInformation = useSelector(
    selectProductSelectedForInformation
  );
  const products = useSelector(selectProducts);
  const isRefresh = useSelector(selectIsRefresh);
  const BASE_URL = "https://product-shop-api.herokuapp.com/product";

  const dataSearch = (e) => {
    let valueInput = e.target.value;

    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(valueInput.toLowerCase());
    });

    setFiltredProduct(newFilter);
    dispatch(changeSearchProduct(newFilter));
  };

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

  const deleteProduct = async (e) => {
    console.log("deleted product #", e.target.id);

    await fetch(`BASE_URL/${e.target.id}`, {
      method: "DELETE",
    }).then((e) => console.log(e.json()));

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
    dispatch(getIsRefresh(true));
    setComment("");
    setShowModal(false);

    return;
  };

  if (products.length === 0) {
    return (
      <div className="container">
        <div className={s.sortGroup}>
          <form onChange={dataSearch}>
            <input
              placeholder="Find your product ... "
              className={s.inputSearch}
            ></input>
          </form>
        </div>
        <h1 className={s.title}>PRODUCT LIST:</h1>
        <SortLine />
        <Spinner />
      </div>
    );
  }

  const lastProductIndex = currentPage * productsPerPage; // Pagination
  const firstProductIndex = lastProductIndex - productsPerPage; // Pagination
  const currentProduct = products.slice(firstProductIndex, lastProductIndex); // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Pagination

  return (
    <div className="container">
      <ToastContainer />
      <div className={s.sortGroup} onChange={dataSearch}>
        <form>
          <input
            placeholder="Find your product ... "
            className={s.inputSearch}
          ></input>
        </form>
      </div>
      <h1 className={s.title}>PRODUCT LIST:</h1>
      <SortLine />

      {filteredProduct.length ? (
        ""
      ) : (
        <p>
          Sorry, we can't find any items. Try to change item's name in the
          search line.
        </p>
      )}
      {filteredProduct && filteredProduct !== " " ? (
        <FilterProduct
          filteredProduct={filteredProduct}
          handleShow={handleShow}
          deleteProduct={deleteProduct}
        />
      ) : (
        <Items
          products={currentProduct}
          handleShow={handleShow}
          deleteProduct={deleteProduct}
        />
      )}

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
                {productSelectedInformation?.size?.width &&
                  productSelectedInformation?.size?.height && <span> x </span>}
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
                        <p className={s.list}>
                          <span>ID: {i}</span>
                        </p>
                        <p className={s.list}>{e}</p>
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
              onClick={(e) => {
                postComment(e);
                toast.success("Thank you! You feedback was successfuly added!");
              }}
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
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
}
