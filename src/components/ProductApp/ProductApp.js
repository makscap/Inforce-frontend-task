import React, { useEffect, useState } from "react";
import ButtonBar from "../ButtonBar/ButtonBar";
import ProductListBox from "../ProductListBox/ProductListBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi, setApi } from "../../services/list";

let Products = () => {
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [productShow, setProductShow] = useState(false);
  // const [newProduct, setNewProduct] = useState({});
  const [itemInput, setItemInput] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [count, setCount] = useState("");
  const [size, setSize] = useState({});
  const [weight, setWeight] = useState("");
  const [comments, setComments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddProduct = () => setProductShow(false);
  const handleShowAddProduct = () => setProductShow(true);

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

    const item = {
      imageUrl: imageUrl ? imageUrl : "empty",
      name: name ? name : "empty",
      count: count ? count : "empty",
      size: size ? size : "empty",
      weight: weight ? weight : "empty",
      comments: comments ? comments : "empty",
    };

    fetch("http://localhost:8000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((data) => {
      console.log("new product added");
      data.json();
    });
    handleCloseAddProduct();
    setRefresh(!refresh);
  };

  const handleDelete = (e) => {
    console.log(e.target.id);
    const saved = e;
    fetch(`http://localhost:8000/product/${e.target.id}`, {
      method: "DELETE",
    }).then((e) => e.json());
    // .then(() => e.filter((e) => e.id === saved.target.id))
    // .then(() => console.log(e));
    setRefresh(!refresh);
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
            // setNewProduct={setNewProduct}
            setItemInput={setItemInput}
            itemInput={itemInput}
            handleSubmit={handleSubmit}
            name={name}
            imgUrl={imageUrl}
            setName={setName}
            setImgUrl={setImageUrl}
            setCount={setCount}
            setSize={setSize}
            setWeight={setWeight}
            setComments={setComments}
          />
          <ProductListBox
            productList={productList}
            handleShow={handleShow}
            handleClose={handleClose}
            show={show}
            handleDelete={handleDelete}
            handleShowAddProduct={handleShowAddProduct}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
