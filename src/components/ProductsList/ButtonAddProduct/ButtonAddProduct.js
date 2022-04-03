import { useSelector, useDispatch } from "react-redux";
import {
  changeIsOpenModalAddProduct,
  selectIsOpenModalAddProduct,
  changeNewProduct,
  selectNewProduct,
} from "./ButtonAddProduct-slice";
import { getIsRefresh } from "../Products/Products-slice";
import Modal from "react-bootstrap/Modal";
import s from "./ButtonAddProduct.module.css";

const ButtonAddProduct = () => {
  const dispatch = useDispatch();
  let IsOpenModalAddProduct = useSelector(selectIsOpenModalAddProduct);
  let newProduct = useSelector(selectNewProduct);

  const postProduct = (e) => {
    e.preventDefault();
    const attention = window.confirm(
      "Are you sure you want to add this product into the database?"
    );

    if (attention) {
      const item = {
        imageUrl: newProduct.imageUrl ? newProduct.imageUrl : "empty",
        name: newProduct.name ? newProduct.name : "empty",
        count: newProduct.count ? newProduct.count : "empty",
        size: newProduct.size ? newProduct.size : "empty",
        weight: newProduct.weight ? newProduct.weight : "empty",
        comments: newProduct.comments ? newProduct.comments : "empty",
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
      // Save it!
      console.log("Product was added to the database.");
    } else {
      // Do nothing!
      console.log("Product was not added to the database.");
    }

    dispatch(changeIsOpenModalAddProduct(false));
    dispatch(getIsRefresh(true));
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(changeIsOpenModalAddProduct(false));
  };

  return (
    <div>
      <button
        type="button"
        className={s.buttonAdd}
        onClick={() => dispatch(changeIsOpenModalAddProduct(true))}
      >
        ADD PRODUCT
      </button>

      <Modal show={IsOpenModalAddProduct} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", justifyContent: "center" }}>
              ADD new product in the collection
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              marginRight: "60px",
            }}
          >
            <label style={{ margin: "10px 0px" }}>
              imgUrl:
              <input
                id="imgUrl"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      imageUrl: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              name:
              <input
                id="name"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              count:
              <input
                id="count"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      count: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label id="size" style={{ margin: "10px 0px" }}>
              size:
              <input
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      size: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px 0px" }}>
              weight:
              <input
                id="weight"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      weight: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <label id="comments" style={{ margin: "10px 0px" }}>
              comments:
              <input
                id="comments"
                onChange={(e) => {
                  dispatch(
                    changeNewProduct({
                      ...newProduct,
                      comments: e.target.value,
                    })
                  );
                }}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <div className={s.btnGroup}>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                onClick={postProduct}
                className={s.btnDefault}
              >
                CONFIRM
              </button>
              <button
                style={{ display: "flex", justifyContent: "center" }}
                onClick={handleClose}
                className={s.btnDefault}
              >
                CANCEL
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ButtonAddProduct;
