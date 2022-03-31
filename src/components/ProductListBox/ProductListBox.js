import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteApi } from "../../services/list";

const ProductListBox = ({
  productList,
  handleShow,
  handleClose,
  show,
  handleDelete,
}) => {
  // const [deleteItem, setDeleteItem] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   deleteApi()
  //     .then((data) => {
  //       deleteItem(deleteItem);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const del = function (item) {
  //   const { id } = item.id;
  //   return fetch(`http://localhost:8000/product/${item.id}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ item }),
  //   }).then((data) => data.json());
  // };

  // const handleDelete = (e) => {
  //   console.log(e.target.id);
  //   const saved = e;
  //   fetch(`http://localhost:8000/product/${e.target.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((e) => e.json())
  //     .then(() => e.filter((e) => e.id === saved.target.id))
  //     .then(() => console.log(e));
  // };

  return (
    <ul className="card-set list">
      {productList.map((e) => (
        <li className="card-set__item" key={e.id} id={e.id}>
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
          </ul>
          <Button
            variant="outline-danger"
            style={{ margin: "10px", width: "100px" }}
            onClick={handleDelete}
            key={e.id}
            id={e.id}
          >
            DELETE
          </Button>
          <ul className=" list" style={{ paddingTop: "20px" }}>
            {/* {Object.values(e.size).map((item) => (
              <li key={item} className="card-set__text">
                {item}
              </li>
            ))} */}
          </ul>
          <ul style={{ backgroundColor: "Khaki" }}>
            {/* {e.comments.map((e) => (
              <li className="list">
                <span style={{ fontWeight: "bold" }}>comments: {e}</span>
              </li>
            ))} */}
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
  );
};

export default ProductListBox;
