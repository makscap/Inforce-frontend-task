import React, { useEffect, useState } from "react";
import ButtonBar from "../ButtonBar/ButtonBar";
import ProductListBox from "../ProductListBox/ProductListBox";
import "bootstrap/dist/css/bootstrap.min.css";

let Products = () => {
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [newProduct, setNewProduct] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddProduct = () => setProductShow(false);
  const handleShowAddProduct = () => setProductShow(true);

  // const postData = fetch("http://localhost:8000/product/", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     id: Date.now(),
  //     imageUrl: "none",
  //     size: "none",
  //     weight: "200g",
  //     comments: "none",
  //   }),
  // });

  useEffect(() => {
    fetch("http://localhost:8000/product/")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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
