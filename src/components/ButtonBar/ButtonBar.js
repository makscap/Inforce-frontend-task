import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ButtonBar = ({
  handleCloseAddProduct,
  handleShowAddProduct,
  productShow,
  postData,
  setNewProduct,
}) => {
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
          <Modal.Title>dsfgdhgf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={postData}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label style={{ margin: "10px" }}>
              name:
              <input onChange={(e) => setNewProduct(e.target.value)}></input>
            </label>
            <label style={{ margin: "10px" }}>
              ImgUrl:
              <input onChange={(e) => setNewProduct(e.target.value)}></input>
            </label>
            <label style={{ margin: "10px" }}>
              size:
              <input onChange={(e) => setNewProduct(e.target.value)}></input>
            </label>
            <label style={{ margin: "10px" }}>
              weight:
              <input onChange={(e) => setNewProduct(e.target.value)}></input>
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
  );
};

export default ButtonBar;
