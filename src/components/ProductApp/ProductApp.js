import React, { useEffect, useState } from "react";
import ButtonBar from "../ButtonBar/ButtonBar";
import ProductListBox from "../ProductListBox/ProductListBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { getList, setItem } from "../../services/list";

let Products = () => {
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [itemInput, setItemInput] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddProduct = () => setProductShow(false);
  const handleShowAddProduct = () => setProductShow(true);

  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setProductList(items);
      }
    });
    return () => (mounted = false);
  }, [productList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput);
    handleCloseAddProduct();
  };

  return (
    <div>
      <main className="container">
        <div>
          <h1 style={{ marginBottom: "40px", marginTop: "40px" }}>
            Product list:
          </h1>
          <ButtonBar
            handleCloseAddProduct={handleCloseAddProduct}
            handleShowAddProduct={handleShowAddProduct}
            productShow={productShow}
            postData=""
            setNewProduct={setNewProduct}
            setItemInput={setItemInput}
            itemInput={itemInput}
            handleSubmit={handleSubmit}
          />
          <ProductListBox
            productList={productList}
            handleShow={handleShow}
            handleClose={handleClose}
            show={show}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
