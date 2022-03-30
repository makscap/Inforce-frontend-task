import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

  const fetchData = async () => {
    const data = await fetch("http://localhost:8000/product/")
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    setProductList(data);
  };

  const postData = async (url = "", data = {}) => {
    const response = await fetch("http://localhost:8000/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <main className="container">
        <div>
          <div>
            <h1 style={{ marginBottom: "40px", marginTop: "40px" }}>
              Product list:
            </h1>
            <div>
              <Button
                onClick={handleShowAddProduct}
                variant="outline-success"
                style={{ margin: "20px", width: "100px" }}
              >
                Add
              </Button>
              <Modal show={productShow} onHide={handleCloseAddProduct}>
                <Modal.Header closeButton>
                  <Modal.Title>dsfgdhgf</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={fetchData}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ margin: "10px" }}>
                      name:
                      <input
                        onChange={(e) => setNewProduct(e.target.value)}
                      ></input>
                    </label>
                    <label style={{ margin: "10px" }}>
                      ImgUrl:
                      <input
                        onChange={(e) => setNewProduct(e.target.value)}
                      ></input>
                    </label>
                    <label style={{ margin: "10px" }}>
                      size:
                      <input
                        onChange={(e) => setNewProduct(e.target.value)}
                      ></input>
                    </label>
                    <label style={{ margin: "10px" }}>
                      weight:
                      <input
                        onChange={(e) => setNewProduct(e.target.value)}
                      ></input>
                    </label>
                    <button type="submit">Submit</button>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseAddProduct}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                variant="outline-warning"
                style={{ margin: "20px", width: "100px" }}
              >
                Edit
              </Button>
            </div>
            <ul className="card-set list">
              {productList.map((e) => (
                <li className="card-set__item" key={e.id}>
                  <ul className=" list" style={{ paddingTop: "20px" }}>
                    <li className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>imageUrl: </span>
                      {e.imageUrl}
                    </li>
                    <li className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>name:</span> {e.name}
                    </li>
                    <li className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>count:</span>
                      {e.count}
                    </li>
                    <li className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>weight:</span>
                      {e.weight}
                    </li>
                    <ul className=" list" style={{ paddingTop: "20px" }}>
                      {Object.keys(e.size).map((sizeInd) => (
                        <li key={sizeInd} className="card-set__text">
                          {e.size[sizeInd]}
                        </li>
                      ))}
                    </ul>
                    <ul style={{ backgroundColor: "Khaki" }}>
                      {e.comments.map((e) => (
                        <li className="list">
                          <span style={{ fontWeight: "bold" }}>
                            comments: {e}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ul>

                  <Button
                    variant="outline-secondary"
                    onClick={handleShow}
                    style={{ margin: "10px" }}
                  >
                    More information ...
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{e.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className=" list" style={{ paddingTop: "20px" }}>
                        <li className="card-set__text">
                          <span style={{ fontWeight: "bold" }}>imageUrl: </span>
                          {e.imageUrl}
                        </li>
                        <li className="card-set__text">
                          <span style={{ fontWeight: "bold" }}>name:</span>{" "}
                          {e.name}
                        </li>
                        <li className="card-set__text">
                          <span style={{ fontWeight: "bold" }}>count:</span>
                          {e.count}
                        </li>
                        <li className="card-set__text">
                          <span style={{ fontWeight: "bold" }}>weight:</span>
                          {e.weight}
                        </li>
                      </ul>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="card-set list">
          <li className="card-set__item"></li>
        </ul>
      </main>
    </div>
  );
};

export default Products;
