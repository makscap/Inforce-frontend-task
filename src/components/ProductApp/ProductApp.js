import React, { useEffect, useState } from "react";
import ButtonBar from "../ButtonBar/ButtonBar";
import ProductListBox from "../ProductListBox/ProductListBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi } from "../../services/list";

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
  const [productId, setProductId] = useState(null);

  const [productState, setProductState] = useState();

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

  const postProduct = (e) => {
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
    setName("");
    setImageUrl("");
    setCount("");
    setSize("");
    setWeight("");
    setComments("");
    setProductId("");
    setRefresh(!refresh);
  };

  const deleteProduct = (e) => {
    fetch(`http://localhost:8000/product/${e.target.id}`, {
      method: "DELETE",
    }).then((e) => e.json());
    setRefresh(!refresh);
    getApi();
  };

  const selectProduct = (id) => {
    let item = productList[id - 1];
    setName(item.name);
    setImageUrl(item.imageUrl);
    setCount(item.count);
    setSize(item.size);
    setWeight(item.weight);
    setComments(item.comments);
    setProductId(item.userId);
  };

  const updateProduct = () => {
    let item = { name, imageUrl, count, size, weight, comments };
    console.warn("item", item);

    fetch(`http://localhost:8000/product/${productId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        console.warn(productId);
        setName("");
        setImageUrl("");
        setCount("");
        setSize("");
        setWeight("");
        setComments("");
        setProductId("");
        setRefresh(!refresh);
        getApi();
      });
    });
  };

  return (
    <div>
      <main className="container">
        <div>
          <h1 style={{ marginBottom: "40px" }}>Product list:</h1>
          <div>
            <div>
              <h4>Edit part:</h4>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
              <br />
              <br />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onClick={() => console.log(name)}
              />
              <br />
              <br />
              <input
                type="text"
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              />
              <br />
              <br />
              {/* <input
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
              <br />
              <br /> */}
              <input
                type="text"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
              <br />
              <br />
              {/* <input
                type="text"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
              <br />
              <br /> */}
              <button onClick={updateProduct}>Update User</button>
            </div>
          </div>
          <ButtonBar
            handleCloseAddProduct={handleCloseAddProduct}
            handleShowAddProduct={handleShowAddProduct}
            productShow={productShow}
            // setNewProduct={setNewProduct}
            setItemInput={setItemInput}
            itemInput={itemInput}
            postProduct={postProduct}
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
            deleteProduct={deleteProduct}
            handleShowAddProduct={handleShowAddProduct}
            selectProduct={selectProduct}
            setProductId={setProductId}
            productState={productState}
            setProductState={setProductState}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
