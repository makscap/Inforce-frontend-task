import React, { useEffect, useState } from "react";
import ButtonBar from "../ButtonBar/ButtonBar";
import ProductListBox from "../ProductListBox/ProductListBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi, setApi } from "../../services/list";

let Products = () => {
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [itemInput, setItemInput] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddProduct = () => setProductShow(false);
  const handleShowAddProduct = () => setProductShow(true);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getApi().then((data) => {
      setProductList(data);
    });
    if (!refresh) return;
    getApi()
      .then((data) => {
        console.log(data);
        setProductList(data);
        setRefresh(false);
        console.log(refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setApi(itemInput);
    setRefresh(!refresh);
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
            setNewProduct={setNewProduct}
            setItemInput={setItemInput}
            itemInput={itemInput}
            handleSubmit={handleSubmit}
            id={id}
            name={name}
            imgUrl={imgUrl}
            setId={setId}
            setName={setName}
            setImgUrl={setImgUrl}
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
