import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ProductListBox = ({ productList, handleShow, handleClose, show }) => {
  return (
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
          </ul>
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
