import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import ButtonEdit from "../Buttons/ButtonEdit";

const ProductListBox = ({
  productList,
  handleShow,
  handleClose,
  show,
  deleteProduct,
  handleShowAddProduct,
  selectProduct,
  setProductId,

  setProductState,
  productState,
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
          <ul
            className=" list"
            style={{ paddingTop: "20px", marginTop: "0px" }}
          >
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>imageUrl: </span>
              {e.imageUrl}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>name: </span> {e.name}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>count: </span>
              {e.count}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>weight: </span>
              {e.weight}
            </li>
          </ul>
          {/* <button
            onClick={() => {
              selectProduct(e.id);
              setProductId(e.id);
            }}
          >
            SELECT
          </button> */}

          <div>
            {/* <ul className=" list" style={{ paddingTop: "20px" }}>
              {e.name
                ? Object.values(e.size).map((item) => (
                    <li key={item} className="card-set__text">
                      <span style={{ fontWeight: "bold" }}>size: </span>
                      {item}
                    </li>
                  ))
                : ""}
            </ul> */}
          </div>
          {/* <ul style={{ backgroundColor: "Khaki" }}>
            {e.comments
              ? e.comments.map((e) => (
                  <li className="list">
                    <span style={{ fontWeight: "bold" }}>comments: {e}</span>
                  </li>
                ))
              : ""}
          </ul> */}
          <div>
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleShow();
                setProductState(e);
              }}
              style={{ margin: "10px" }}
            >
              More information...
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outline-danger"
              style={{ margin: "20px", width: "100px" }}
              onClick={deleteProduct}
              key={e.id}
              id={e.id}
            >
              DELETE
            </Button>
            <Button
              variant="outline-warning"
              style={{ margin: "20px", width: "100px" }}
              onClick={() => {
                selectProduct(e.id);
                setProductId(e.id);
              }}
            >
              SELECT
            </Button>
            {/* <ButtonEdit
              variant="outline-warning"
              onClick={handleShowAddProduct}
            /> */}
          </div>
        </li>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productState?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className=" list" style={{ paddingTop: "20px" }}>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>imageUrl: </span>
              {productState?.imageUrl}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>name:</span>
              {productState?.name}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>count:</span>
              {productState?.count}
            </li>
            <li className="card-set__text">
              <span style={{ fontWeight: "bold" }}>weight:</span>
              {productState?.weight}
            </li>
            {/* <li className="card-set__text">
                  <span style={{ fontWeight: "bold" }}>size:</span>
                  {e.size}
                </li>*/}
            {/* <li className="card-set__text">
                  <span style={{ fontWeight: "bold" }}>comments:</span>
                  {e.comments}
                </li> */}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </ul>
  );
};

export default ProductListBox;
