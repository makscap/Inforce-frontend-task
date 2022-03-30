import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ButtonAdd = (
  handleShowAddProduct,
  productShow,
  handleCloseAddProduct,
  setItemInput,
  itemInput,
  handleSubmit,
  setNewProduct,
  name,
  imgurl,
  count,
  size,
  weight
) => {
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
    </div>
  );
};

export default ButtonAdd;
