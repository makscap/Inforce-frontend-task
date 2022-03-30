import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ButtonBar = ({
  handleCloseAddProduct,
  handleShowAddProduct,
  productShow,
  setNewProduct,
  setItemInput,
  itemInput,
  handleSubmit,
  imgUrl,
  setId,
  setName,
  setImgUrl,
}) => {
  const id = useRef(null);
  const imgurl = useRef(null);
  const name = useRef(null);
  const size = useRef(null);
  const weight = useRef(null);
  const count = useRef(null);

  // function putApi(item) {
  //   const data = {
  //     imgUrl: imgurl.current.value,
  //     name: name.current.value,
  //     count: count.current.value,
  //     size: size.current.value,
  //     weight: weight.current.value,
  //   };

  //   return fetch(`http://localhost:8000/product/1`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   }).then((data) => data.json());
  // }

  // const handleSubmitPut = (e) => {
  //   e.preventDefault();
  //   putApi(id, name, imgUrl);
  //   handleCloseAddProduct();
  // };

  return (
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
          <Modal.Title>ADD new product in the collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
            onSubmit={handleSubmit}
          >
            <label id="imgurl" style={{ margin: "10px" }}>
              ImgUrl:
              <input
                ref={imgurl}
                onChange={(e) => setNewProduct(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              name:
              <input
                ref={name}
                id="id"
                onChange={(e) => setNewProduct(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              count:
              <input
                ref={count}
                id="count"
                onChange={(e) => setNewProduct(e.target.value)}
              ></input>
            </label>

            <label id="size" style={{ margin: "10px" }}>
              size:
              <input
                ref={size}
                onChange={(e) => setNewProduct(e.target.value)}
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px" }}>
              weight:
              <input
                ref={weight}
                id="name"
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
        onClick={handleShowAddProduct}
        disabled
      >
        Edit
      </Button>
      {/* <Modal show={productShow} onHide={handleCloseAddProduct}>
        <Modal.Header closeButton>
          <Modal.Title>ADD new product in the collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
            // onSubmit={handleSubmitPut}
          >
            <label id="imgurl" style={{ margin: "10px" }}>
              ImgUrl:
              <input
                ref={imgurl}
                onChange={(e) => setImgUrl(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              name:
              <input
                ref={name}
                id="id"
                onChange={(e) => setId(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              count:
              <input
                ref={count}
                id="count"
                onChange={(e) => setId(e.target.value)}
              ></input>
            </label>

            <label id="size" style={{ margin: "10px" }}>
              size:
              <input
                ref={size}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px" }}>
              weight:
              <input
                ref={weight}
                id="name"
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
      </Modal> */}

      <Button
        variant="outline-danger"
        style={{ margin: "20px", width: "100px" }}
        disabled
      >
        Delete
      </Button>
    </div>
  );
};

export default ButtonBar;
